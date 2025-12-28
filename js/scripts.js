/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
const username = 'pedrogones';
const container = document.getElementById('github-repos');
    const loadMoreBtn = document.getElementById('load-more');

    let page = 1;
    const perPage = 6;

    function carregarRepos() {
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&page=${page}&per_page=${perPage}`)
            .then(res => res.json())
            .then(repos => {

                if (repos.length === 0) {
                    loadMoreBtn.style.display = 'none';
                    return;
                }

                repos
                    .filter(repo => !repo.fork)
                    .forEach(repo => {
                        const col = document.createElement('div');
                        col.className = 'col-lg-4 col-sm-6';

                        col.innerHTML = `
                            <div class="card repo-card h-100 shadow-sm">
                                <div class="card-body p-4 d-flex flex-column">
                                    <h5 class="fw-bold mb-2">${repo.name}</h5>
                                    <p class="text-muted small flex-grow-1">
                                        ${repo.description ?? 'Projeto sem descrição.'}
                                    </p>

                                    <div class="d-flex justify-content-between align-items-center mt-3">
                                        <span class="repo-lang">${repo.language ?? 'Código'}</span>
                                        <div class="repo-stats text-muted small">
                                            <i class="fas fa-star"></i> ${repo.stargazers_count}
                                            &nbsp;
                                            <i class="fas fa-code-branch"></i> ${repo.forks_count}
                                        </div>
                                    </div>
                                </div>

                                <div class="card-footer bg-transparent border-0 text-center pb-4">
                                    <a href="${repo.html_url}" target="_blank"
                                       class="btn btn-outline-primary btn-sm">
                                        Ver no GitHub
                                    </a>
                                </div>
                            </div>
                        `;

                        container.appendChild(col);
                    });

                page++;
            })
            .catch(() => {
                loadMoreBtn.innerText = 'Erro ao carregar';
                loadMoreBtn.disabled = true;
            });
    }

    loadMoreBtn.addEventListener('click', carregarRepos);

    carregarRepos();

    const nascimento = new Date(2004, 0, 1); // ajuste mês/dia se quiser
    const hoje = new Date();

    const year = hoje.getFullYear();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const jaFezAniversario =
        hoje.getMonth() > nascimento.getMonth() ||
        (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() >= nascimento.getDate());

    if (!jaFezAniversario) idade--;

    document.getElementById('idade').textContent = idade;
    document.getElementById('year').textContent = year;