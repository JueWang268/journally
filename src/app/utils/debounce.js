export default function debounce (func, delay = 1000)  {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    }
  }