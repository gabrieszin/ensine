"use strict";

import { pegarNomeDominio } from './modulos/utilitarios.js';

(() => {  
  function renderTooltips(){
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }
  
  function renderPopovers(){
    $(document).ready(function(){
      $('[data-bs-toggle="popover"]').popover();  
    });
  }
  
  document.querySelectorAll('[data-recarrega-pagina]').forEach(botao => {
    botao.addEventListener('click', () => {
      window.location.reload();
    })
  })
  
  /* Sobre elementos de Códigos */
  const codigos = document.querySelectorAll('code');
  codigos.forEach((codigo) => {
    hljs.highlightElement(codigo);
    codigo.textContent += `\n`;
  })
  
  const copiarCodigo = (codigo) => {
    const conteudoCodigo = codigo.textContent;
    
    try{
      navigator.clipboard.writeText(conteudoCodigo.trim());
      return true;
    }catch(erro){
      return false;
    }
  }
  
  const acionarCopiaCodigo = (evento, botao) => {
    const pre = evento.target.closest('pre');
    const code = pre.querySelector('code');
    
    if(copiarCodigo(code)){
      botao.querySelector('span').textContent = 'Código \n copiado'
      botao.classList.value = 'codigo__btn-copiar sucesso';
    }else{
      botao.querySelector('span').textContent = 'Erro \n ao copiar'
      botao.classList.value = 'codigo__btn-copiar erro';
    }
    
    setTimeout(() => {
      botao.classList.value = 'codigo__btn-copiar ok';
      botao.querySelector('span').textContent = 'Copiar o \n código acima'
    }, 2000)
  }
  
  const btnCopiaCodigo = document.querySelectorAll('[data-acao-copiar-codigo]');
  btnCopiaCodigo.forEach(botao => {
    botao.addEventListener('click', (evento) => {
      acionarCopiaCodigo(evento, botao);
    })
  })

  /* Sobre elementos de texto */
  const abbrs = document.querySelectorAll('abbr');
  abbrs.forEach(abbr => {
    abbr.setAttribute('tabindex', '0');
    abbr.setAttribute('data-bs-toggle', 'popover');
    abbr.setAttribute('data-bs-trigger', 'hover focus');
    abbr.setAttribute('data-bs-title', `${abbr.textContent}`);
    abbr.setAttribute('data-bs-content', `${abbr.title}`);
  })
  renderPopovers();

  const links = document.querySelectorAll('.paragrafo > [href]');
  links.forEach(link => {
    link.dataset.toggle = 'tooltip';
    link.dataset.placement = 'top';
    link.dataset.bsCustomClass = 'tooltip-href-link';
    link.title = `${pegarNomeDominio(link.href)}`
  });
  renderTooltips();
  
})();