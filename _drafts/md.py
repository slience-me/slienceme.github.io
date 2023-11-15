import os
import requests
from urllib.parse import urlparse, unquote


def convert(md_path, save_path='./images'):
    if md_path.find('\\'):
        save_name = md_path.split('\\')[-1]
    elif md_path.find('/'):
        save_name = md_path.split('/')[-1]
    else:
        save_name = md_path

    with open(md_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # 创建目标保存文件夹
    if not os.path.exists(save_path):
        os.makedirs(save_path)

    for idx, line in enumerate(lines):
        if '![' in line:
            start = line.find('(')
            end = line.find(')')
            img_url = line[start + 1:end]

            if img_url.startswith('https://img-blog.csdnimg.cn'):
                img_filename = os.path.join(save_path, os.path.basename(unquote(urlparse(img_url).path.split('?')[0])))
                img_filename = img_filename.replace('\\', '/')
                img_extensions = ['jpg', 'jpeg', 'png']

                if not any(ext in img_filename for ext in img_extensions):
                    img_filename += '.jpg'

                lines[idx] = f'![Alt Text]({img_filename})\n'
                img = requests.get(img_url)
                with open(img_filename, 'wb') as img_file:
                    img_file.write(img.content)
            else:
                pass

            # 下载图片

    with open(os.path.join('./mdfile', save_name), 'w', encoding='utf-8') as f:
        for line in lines:
            f.write(line)


def process_markdown_files(folder_path):
    md_paths = [os.path.join(folder_path, file) for file in os.listdir(folder_path) if file.endswith('.md')]
    for md_path in md_paths:
        convert(md_path)


if __name__ == '__main__':
    folder_path = '.'  # 设置包含 markdown 文件的文件夹路径
    process_markdown_files(folder_path)
