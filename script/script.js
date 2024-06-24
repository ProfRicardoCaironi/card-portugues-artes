document.addEventListener('DOMContentLoaded', () => {
    let virando = false; // Para evitar cliques extras enquanto as cartas estão sendo verificadas
    let viradas = 0; // Contador de quantas cartas estão viradas
    let cartaVirada = null; // Armazena a carta virada mais recentemente
    let paresEncontrados = 0; // Contador de pares encontrados

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (virando || card.classList.contains('is-flipped')) {
                return;
            }

            card.classList.add('is-flipped');
            viradas++;

            if (viradas === 1) {
                // Primeira carta virada
                cartaVirada = card;
            } else if (viradas === 2) {
                // Segunda carta virada
                virando = true; // Impede novos cliques até verificar correspondência

                // Verifica se as duas cartas correspondem
                const cartaVirada2 = card;
                const tipo1 = cartaVirada.dataset.tipo;
                const tipo2 = cartaVirada2.dataset.tipo;

                if (tipo1 === tipo2) {
                    // Correspondem, mantém viradas e conta o par encontrado
                    setTimeout(() => {
                        cartaVirada = null;
                        virando = false;
                        viradas = 0;
                        paresEncontrados++;

                        // Verifica se todos os pares foram encontrados
                        if (paresEncontrados === cards.length / 2) {
                            // Habilita o botão de redirecionamento
                            const botaoRedirecionamento = document.querySelector('.redirect-button a');
                            botaoRedirecionamento.classList.remove('disabled');
                            botaoRedirecionamento.href = "Considerações Finais.html";
                        }
                    }, 1000);
                } else {
                    // Não correspondem, desvira após um tempo
                    setTimeout(() => {
                        cartaVirada.classList.remove('is-flipped');
                        cartaVirada2.classList.remove('is-flipped');
                        cartaVirada = null;
                        virando = false;
                        viradas = 0;
                    }, 1000);
                }
            }
        });
    });
});