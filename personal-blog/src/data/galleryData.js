// 使用 require.context 动态导入所有图片
const importAll = (r) => {
  let images = [];
  r.keys().forEach((item, index) => {
    images.push({
      id: index + 1,
      src: r(item),
      title: `图片 ${index + 1}`,
      description: `这是第 ${index + 1} 张图片的描述`
    });
  });
  return images;
};

// 导入 gallery 目录下的所有图片文件
export const galleryImages = importAll(
  require.context('../assets/images/gallery', false, /\.(png|jpe?g|gif)$/i)
);

// 打印日志以便调试
console.log('Loaded gallery images:', galleryImages); 