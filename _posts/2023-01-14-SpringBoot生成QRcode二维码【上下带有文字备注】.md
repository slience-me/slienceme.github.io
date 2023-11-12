---
layout: post
title: Java｜SpringBoot生成QRcode二维码【上下带有文字备注】
categories: [Java]
description: SpringBoot生成QRcode二维码【上下带有文字备注】
keywords: 编程语言, Java
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

## 1. 导入pom.xml

```java
<dependency>
    <groupId>com.google.zxing</groupId>
    <artifactId>core</artifactId>
    <version>3.1.0</version>
</dependency>
<dependency>
    <groupId>com.google.zxing</groupId>
    <artifactId>javase</artifactId>
    <version>3.1.0</version>
</dependency>
```
## 2. 二维码工具包

```java
/**
 * @title QRcodeUtil
 * @description wms-parent
 * @author slience_me
 * @version 1.0.0
 * @since 2023/1/13 13:29
 */
package xyz.slienceme.utils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import lombok.extern.slf4j.Slf4j;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class QRCodeUtil {


    private static final int WHITE = 0xFFFFFFFF;
    private static final int BLACK = 0xFF000000;
    private static final int HEIGHT = 2000;
    private static final int WIDTH = 4000;
    private static final int PIC_HEIGHT = HEIGHT + 220;
    private static final int PIC_HEIGHT1 = HEIGHT + 1900;
    private static final int PIC_HEIGHT2 = HEIGHT + 2100;


    /**
     * 二维码传图片
     *
     * @param matrix
     * @return
     */
    public static BufferedImage toBufferedImage(BitMatrix matrix) {
        int width = matrix.getWidth();
        int height = matrix.getHeight();
        BufferedImage image = new BufferedImage(width, PIC_HEIGHT, BufferedImage.TYPE_INT_RGB);
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < PIC_HEIGHT; y++) {
                image.setRGB(x, y, WHITE);
            }
        }
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                image.setRGB(x, y, matrix.get(x, y) ? BLACK : WHITE);
            }
        }
        return image;
    }

    /**
     * 生成二维码
     *
     * @param content 扫描二维码的内容
     * @param format  图片格式 jpg
     *                文件
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    public static BufferedImage generateQrCode(String content, String format) throws Exception {
        MultiFormatWriter multiFormatWriter = new MultiFormatWriter();
        @SuppressWarnings("rawtypes")
        Map hints = new HashMap();
        // 设置UTF-8， 防止中文乱码
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        // 设置二维码的容错性
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.M);
        // 设置二维码四周白色区域的大小
        hints.put(EncodeHintType.MARGIN, 5);
        // 画二维码
        BitMatrix bitMatrix = multiFormatWriter.encode(content, BarcodeFormat.QR_CODE, WIDTH, HEIGHT, hints);
        BufferedImage image = toBufferedImage(bitMatrix);
        return image;
    }

    /**
     * 把生成的图片写到指定路径
     *
     * @param qrcFile       路径
     * @param qrCodeContent 二维码内容
     * @param goodsName     增加的文字
     * @throws Exception
     */
    public static void generateQrCodeByPath(File qrcFile, File fontPath, String qrCodeContent, String goodsName, String depotName) throws Exception {
        BufferedImage image = generateQrCode(qrCodeContent, "png");
        Graphics g = image.getGraphics();
        ((Graphics2D) g).setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        //设置字体，大小
        String filename = "SimHei.ttf";
        File fontFile = new File(fontPath, filename);
        Font font = new Font(fontFile.getAbsolutePath(), Font.PLAIN, 150);
        //System.out.println("font = " + font);
        g.setFont(font);
        g.setColor(Color.black);
        FontMetrics metrics = g.getFontMetrics(font);
        // 文字在图片中的坐标 这里设置在中间
        int startX = (WIDTH - metrics.stringWidth(goodsName)) / 2;
        int startX1 = (WIDTH - metrics.stringWidth(depotName)) / 2;
        int startX2 = (WIDTH - metrics.stringWidth(qrCodeContent)) / 2;
        //System.out.println("startX = " + startX);
        //  int startY=HEIGHT+(PIC_HEIGHT-HEIGHT)/2;  //文字在二维码上面
        int startY = PIC_HEIGHT - HEIGHT;  //文字在二维码下面
        int startY1 = PIC_HEIGHT1 - HEIGHT;  //文字在二维码下面
        int startY2 = PIC_HEIGHT2 - HEIGHT;  //文字在二维码下面
        //System.out.println("startY = " + startY);
        g.drawString(goodsName, startX, startY);
        g.drawString(depotName, startX1, startY1);
        g.drawString(qrCodeContent, startX2, startY2);
        g.dispose();
        image.flush();
        try {
            ImageIO.write(image, "png", qrcFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 把生成的图片返回到前端
     *
     * @param qrCodeContent 二维码内容
     * @param pressText     增加的文字
     * @throws Exception
     */
    public static BufferedImage generateQrCodeBack(String qrCodeContent, String pressText) throws Exception {
        BufferedImage image = generateQrCode(qrCodeContent, "jpg");
        Graphics g = image.getGraphics();
        ((Graphics2D) g).setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        Font font = new Font("黑体", Font.PLAIN, 150);
        g.setFont(font);
        g.setColor(Color.black);
        FontMetrics metrics = g.getFontMetrics(font);
        // 文字在图片中的坐标 这里设置在中间
        int startX = (WIDTH - metrics.stringWidth(pressText)) / 2;
        //  int startY=HEIGHT+(PIC_HEIGHT-HEIGHT)/2;  //文字在二维码下面
        int startY = PIC_HEIGHT - HEIGHT;  //文字在二维码上面
        g.drawString(pressText, startX, startY);
        g.dispose();
        image.flush();
        return image;
    }
}
```
## 3. ServiceImpl

```java
	@Value("${file.qrcode}")
    private String qrcode;
    @Autowired
    private GoodsMapper goodsMapper;

    @Override
    public void generateQRCode(File filePath, String dirPath, File fontPath) throws Exception {
        List<HashMap<String, Object>> hashMaps = demoMapper.selectList();
        if (!hashMaps.isEmpty()) {
            for (HashMap<String, Object> hashMap : hashMaps) {
                //System.out.println("hashMap = " + hashMap);
                HashMap<EncodeHintType, Object> hints = new HashMap();
                //指定字符编码为“utf-8”
                hints.put(EncodeHintType.CHARACTER_SET, "utf-8");
                //指定二维码的纠错等级为中级
                hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.M);
                //设置图片的边距
                hints.put(EncodeHintType.MARGIN, 1);
                String code = "000000001";
                File path = new File(dirPath + code + ".png");
                QRCodeUtil.generateQrCodeByPath(path, fontPath, goodsCode, "文字1", "文字2");
            }
        }
    }
```
## 4. 效果图 
![Alt Text](/images/posts/f9d10aa8ee8d4a2d99dc54f9ae41d556.png)

![Alt Text](/images/posts/995c723003974dc38304f96a1e419994.png)

## 4. 注意部署Linux后，可能文字丢失Font
解决方案

[ 【springboot】linux系统部署后Font文字不存在【Java Font 自定义字体】【2023年1月14日】](https://blog.csdn.net/Slience_me/article/details/128689953)

