import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFavicon() {
  const inputPath = path.join(__dirname, '../app/icon.png');
  const outputPath = path.join(__dirname, '../public/favicon.ico');

  // 创建不同尺寸的 PNG
  const sizes = [16, 32, 48];

  try {
    // 为每个尺寸创建 PNG
    const resizePromises = sizes.map(size =>
      sharp(inputPath)
        .resize(size, size, { fit: 'cover' })
        .toBuffer()
    );

    const resizedBuffers = await Promise.all(resizePromises);

    // 将 buffer 保存为临时文件
    const tempFiles = await Promise.all(resizedBuffers.map(async (buffer, index) => {
      const tempPath = path.join(__dirname, `temp-${sizes[index]}.png`);
      fs.writeFileSync(tempPath, buffer);
      return tempPath;
    }));

    // 转换为 ICO
    const icoBuffer = await pngToIco(tempFiles);

    // 保存文件
    fs.writeFileSync(outputPath, icoBuffer);

    // 清理临时文件
    tempFiles.forEach(file => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });

    console.log('✅ favicon.ico 生成成功！');
    console.log(`📁 位置: ${outputPath}`);
  } catch (error) {
    console.error('❌ 生成失败:', error);
    process.exit(1);
  }
}

generateFavicon();
