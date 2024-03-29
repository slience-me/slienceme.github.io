---
layout: post
title: Java｜批量生成QRCode二维码PDF文件
categories: [Java]
description: 批量生成QRCode二维码PDF文件
keywords: 编程语言, Java
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

## 需求：导出产品二维码PDF文件

### 1. Anchor设置页眉标题 
![Alt Text](/images/posts/751056a711e14a6a9a1461c4877fda37.png)

## 工具包
```java
/**
 * @title PdfReport
 * @description wms-parent
 * @author slience_me
 * @version 1.0.0
 * @since 2023/1/13 14:08
 */
package xyz.slienceme.utils.pdf;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.draw.DottedLineSeparator;
import com.itextpdf.text.pdf.draw.LineSeparator;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Objects;

public class PdfReport {

    // 定义全局的字体静态变量
    private static Font titlefont;
    private static Font headfont;
    private static Font keyfont;
    private static Font textfont;
    // 最大宽度
    private static int maxWidth = 520;
    
    public void generateQRCodePDF(Document document, File filePath, File fontPath) throws Exception {
        String filename = "SimHei.ttf";
        File fontFile = new File(fontPath, filename);
        BaseFont bfChinese = BaseFont.createFont(fontFile.getAbsolutePath(), BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
        titlefont = new Font(bfChinese, 16, Font.BOLD);
        Paragraph paragraph = new Paragraph("产品二维码导出", titlefont);
        paragraph.setAlignment(1);
        paragraph.setIndentationLeft(12);
        paragraph.setIndentationRight(12);
        paragraph.setFirstLineIndent(24);
        paragraph.setLeading(20f);
        paragraph.setSpacingBefore(5f);
        paragraph.setSpacingAfter(10f);
        Anchor anchor = new Anchor("设置页眉标题");
        anchor.setReference("超链接");
        PdfPTable table = createTable(new float[]{280, 280});//两列每个280
        File[] files = filePath.listFiles();//文件列表
        PdfPCell cell = new PdfPCell();
        if (Objects.nonNull(files)){
            System.out.println("生成二维码PDF文件,  总共:"+files.length+"个文件");
            int i=1;
            for (File file : files) {
                System.out.print(i++); System.out.print("->");
                Image image = Image.getInstance(file.getAbsolutePath());
                image.setAlignment(Image.ALIGN_CENTER);
                cell.setImage(image);
                table.addCell(cell);
            }
            document.add(paragraph);
            document.add(anchor);
            document.add(table);
        } else {
            System.out.println("文件不存在!!");
        }

    }

    /**
     * 创建单元格(指定字体)
     *
     * @param value
     * @param font
     * @return
     */
    public PdfPCell createCell(String value, Font font) {
        PdfPCell cell = new PdfPCell();
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPhrase(new Phrase(value, font));
        return cell;
    }

    /**
     * 创建指定列宽、列数的表格
     *
     * @param widths
     * @return
     */
    public PdfPTable createTable(float[] widths) {
        PdfPTable table = new PdfPTable(widths);
        try {
            table.setTotalWidth(maxWidth);
            table.setLockedWidth(true);
            table.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.getDefaultCell().setBorder(1);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return table;
    }
}




```

## 调用并下载功能
```java
@Override
    public void generatePdf(HttpServletRequest request, HttpServletResponse response, File imagePath, File pdfPath, File fontPath) throws Exception {
        String date = DateUtil.getDate("yyyyMMddHHmmss");
        String fileName = "文件名称" + date + ".pdf";
        try {
            Document document = new Document(PageSize.A4);
            File file = new File(pdfPath.getAbsolutePath().replace("\\", "/") + "/" + "文件名称.pdf");
            file.createNewFile();
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(file));
            writer.setPageEvent(new Watermark("slience_me"));// 水印
            writer.setPageEvent(new MyHeaderFooter(fontPath));// 页眉/页脚
            document.open();
            document.addTitle("QRCode导出文件");// 标题
            document.addAuthor("slience_me");// 作者
            document.addSubject("QRCode导出文件");// 主题
            document.addKeywords("QRCode导出文件");// 关键字
            document.addCreator("slience_me");// 创建者
            PdfReport pdfReport = new PdfReport();
            pdfReport.generateQRCodePDF(document, imagePath, fontPath);
            document.close();
            FileInputStream fileInputStream = new FileInputStream(file);
            InputStream fis = new BufferedInputStream(fileInputStream);
            byte[] buffer = new byte[fis.available()];
            fis.read(buffer);
            fis.close();
            response.reset();
            response.setCharacterEncoding("UTF-8");
            //Content-Disposition的作用：告知浏览器以何种方式显示响应返回的文件，用浏览器打开还是以附件的形式下载到本地保存
            //attachment表示以附件方式下载 inline表示在线打开 "Content-Disposition: inline; filename=文件名.mp3"
            // filename表示文件的默认名称，因为网络传输只支持URL编码的相关支付，因此需要将文件名URL编码后进行传输,前端收到后需要反编码才能获取到真正的名称
            response.addHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
            // 告知浏览器文件的大小
            response.addHeader("Content-Length", "" + file.length());
            OutputStream outputStream = new BufferedOutputStream(response.getOutputStream());
            response.setContentType("application/octet-stream");
            outputStream.write(buffer);
            outputStream.flush();
            outputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
```

```java
/**
 * @title Watermark
 * @description wms-parent
 * @author slience_me
 * @version 1.0.0
 * @since 2023/1/13 14:10
 */
package xyz.slienceme.utils.pdf;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.GrayColor;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

public class Watermark extends PdfPageEventHelper {
    Font FONT = new Font(Font.FontFamily.HELVETICA, 30, Font.BOLD, new GrayColor(0.95f));
    private String waterCont;//水印内容

    public Watermark(String waterCont) {
        this.waterCont = waterCont;
    }
    
    @Override
    public void onEndPage(PdfWriter writer, Document document) {
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                ColumnText.showTextAligned(writer.getDirectContentUnder(),
                        Element.ALIGN_CENTER,
                        new Phrase(this.waterCont == null ? "HELLO WORLD" : this.waterCont, FONT),
                        (50.5f + i * 350),
                        (40.0f + j * 150),
                        writer.getPageNumber() % 2 == 1 ? 45 : -45);
            }
        }
    }
}
```

```java
/**
 * @title MyHeaderFooter
 * @description wms-parent
 * @author slience_me
 * @version 1.0.0
 * @since 2023/1/13 14:10
 */
package xyz.slienceme.utils.pdf;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import java.io.File;
import java.io.IOException;
public class MyHeaderFooter extends PdfPageEventHelper {
    // 总页数
    PdfTemplate totalPage;
    Font hfFont;
    public MyHeaderFooter(File fontPath) {
        String filename = "SimHei.ttf";
        File fontFile = new File(fontPath, filename);
        hfFont = FontFactory.getFont(fontFile.getAbsolutePath(), BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED,10f, Font.NORMAL, BaseColor.BLACK);
    }
    // 打开文档时，创建一个总页数的模版
    public void onOpenDocument(PdfWriter writer, Document document) {
        PdfContentByte cb = writer.getDirectContent();
        totalPage = cb.createTemplate(30, 16);
    }
    // 一页加载完成触发，写入页眉和页脚
    public void onEndPage(PdfWriter writer, Document document) {
        PdfPTable table = new PdfPTable(3);
        try {
            table.setTotalWidth(PageSize.A4.getWidth() - 100);
            table.setWidths(new int[]{24, 24, 3});
            table.setLockedWidth(true);
            table.getDefaultCell().setFixedHeight(-10);
            table.getDefaultCell().setBorder(Rectangle.BOTTOM);

            table.addCell(new Paragraph("大标题", hfFont));// 可以直接使用addCell(str)，不过不能指定字体，中文无法显示
            table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(new Paragraph("第" + writer.getPageNumber() + "页/", hfFont));
            // 总页数
            PdfPCell cell = new PdfPCell(Image.getInstance(totalPage));
            cell.setBorder(Rectangle.BOTTOM);
            table.addCell(cell);
            // 将页眉写到document中，位置可以指定，指定到下面就是页脚
            table.writeSelectedRows(0, -1, 50, PageSize.A4.getHeight() - 20, writer.getDirectContent());
        } catch (Exception de) {
            throw new ExceptionConverter(de);
        }
    }

    // 全部完成后，将总页数的pdf模版写到指定位置
    public void onCloseDocument(PdfWriter writer, Document document) {
        String text = "总" + (writer.getPageNumber()) + "页";
        ColumnText.showTextAligned(totalPage, Element.ALIGN_LEFT, new Paragraph(text, hfFont), 2, 2, 0);
    }

}
```
## 导出效果
![Alt Text](/images/posts/37343e08fd014d6282c18508712023ca.png)


## 其他问题
[springboot生成QRcode二维码【上下带有文字备注】【2023年1月14日】](https://blog.csdn.net/Slience_me/article/details/128689799)

[【springboot】linux系统部署后Font文字不存在【Java Font 自定义字体】【2023年1月14日】](https://blog.csdn.net/Slience_me/article/details/128689953)
