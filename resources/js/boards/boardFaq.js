const faqcontents = document.querySelectorAll('.faq-content li');

faqcontents.forEach((faqitem) => {
  const title = faqitem.querySelector('.faq-item-title');
  const content = faqitem.querySelector('.faq-item-content');

  title.addEventListener('click', () => {
    content.classList.toggle('hidden');
  });
});
