"use strict";

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
  // const paragrafos_grupos = document.querySelectorAll('.paragrafos-grupo');
  // paragrafos_grupos.forEach(paragrafos => {
  //   const quantidade = paragrafos.querySelectorAll('p.paragrafo').length;

  //   if(quantidade > 1){
  //     //2 colunas necessárias
  //     paragrafos.style.gridTemplateColumns = `repeat(2, minmax(calc(50% - 1rem), 1fr))`;
  //     const metade = (quantidade, Math.ceil(quantidade / 2));

  //     if(metade >= 2){
  //       paragrafos.style.gridTemplateRows = `repeat(${quantidade}, auto)`;

  //       paragrafos.querySelectorAll('p.paragrafo').forEach((paragrafo, index) => {
  //         console.log(paragrafo)
  //         if((index + 1) <= metade){
  //           paragrafo.style.gridColumn = `1/2`;
  //         }else{
  //           paragrafo.style.gridColumn = `2/2`
  //         }
  //         paragrafo.style.gridRow = `${index + 1}/${metade}`;
  //         console.log(`${index + 1}/${metade}`, index % 2)
  //         // `grid-row: ${index + 1}/${metade}`;
  //       })
  //     }
  //   }

  //   // paragrafos.style.gridTemplateColumns = `repeat(${paragrafos.childElementCount}, calc(50 - 1rem))`;
  // })

  const abbrs = document.querySelectorAll('abbr');
  abbrs.forEach(abbr => {
    abbr.setAttribute('tabindex', '0');
    abbr.setAttribute('data-bs-toggle', 'popover');
    abbr.setAttribute('data-bs-trigger', 'hover focus');
    abbr.setAttribute('data-bs-title', `${abbr.textContent}`);
    abbr.setAttribute('data-bs-content', `${abbr.title}`);
  })
  renderPopovers();
  
})();