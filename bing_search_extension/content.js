// 创建一个div元素显示日期
let div = document.createElement('div');
div.style.position = 'fixed'; 
div.style.top = '10px';
div.style.left = '10px';
div.style.padding = '5px';
div.style.backgroundColor = '#eee';
div.style.zIndex = '9999';

// 构造当前日期,格式为 yyyy-mm-dd
let date = new Date();
let dateStr = date.getFullYear() + '-' 
             + (date.getMonth() + 1) + '-' 
             + date.getDate();

// 将日期写入div中  
div.innerText = dateStr;

// 将div添加到页面上
document.body.appendChild(div);