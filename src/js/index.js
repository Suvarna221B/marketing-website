const fun = (text) => {
    document.getElementById('js-content').innerHTML = text;
}


setTimeout(() => fun("Hi from js"),5000)