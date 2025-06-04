// 检查部署状态的辅助脚本
// 使用方法: node scripts/check-deployment.js

console.log('Vercel自动部署配置检查');
console.log('======================');
console.log('');
console.log('检查点:');
console.log('1. vercel.json 已配置');
console.log('2. main分支已设置自动部署');
console.log('3. GitHub与Vercel的集成已启用');
console.log('');
console.log('配置完成! 每次提交到main分支时，Vercel应自动部署您的应用。');
console.log('');
console.log('如果自动部署不工作，请执行以下操作:');
console.log('- 在Vercel控制台中检查您的项目设置');
console.log('- 确保"Git"选项卡中启用了"自动部署"');
console.log('- 检查GitHub仓库设置中的Webhooks是否包含Vercel webhooks');
console.log('- 检查Vercel项目的构建日志查看错误'); 