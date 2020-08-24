const playBtn = document.querySelector('input.btn');
const textBox = document.querySelector('div.textbox');

playBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const userNameValue = document.querySelector('input').value.trim();
  if (userNameValue !== '') {
    alert(`Happy Qixi Festival ${userNameValue}`);
    open(`/puzzle`, '_self');
  } else {
    const errorText = document.createElement('p');
    const textNode = document.createTextNode('Please enter your name!');
    errorText.appendChild(textNode);
    insertAfter(textBox, errorText);
    setTimeout(() => {
      document.querySelector('p').remove();
    }, 1000);
  }
});

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
