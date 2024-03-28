const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
        <img src="${user.avatarUrl}" alt="foto do perfil do usuario" />
        <div class="data">
             <h1>${user.name ?? 'Nao possui nome cadastrado 😢'}</h1>
             <p>${user.bio ?? 'Nao possui bio cadastrada 😢'}</p>
             <br>
             <p>👥 Seguidores: ${user.followers}</p>
             <p>👥 Seguindo: ${user.following}</p>
         </div>
         </div>`

        

         if(user.repositories.length > 0){
            let repositoriesItens = ''
            user.repositories.forEach(repo => 
                
                repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">
                    <h4>${repo.name}</h4>
                    <i class="forks">🍴 ${repo.forks_count}</i>
                    <i class="stars">⭐ ${repo.stargazers_count}</i>
                    <i class="watchers">👀 ${repo.watchers_count}</i>
                    <i class="language">👩‍💻 ${repo.language ?? 'Sem linguagem'}</i>
                </a></li>`)  

            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItens}</ul>
                                           </div>` 
        }

        if(user.events.length > 0){            
            let eventsItens = ''

            user.events.forEach(event => {
                if(event.payload){
                    if(event.payload.commits){
                        const commits = event.payload.commits
                        const commistsList = commits.map(commit => `<span>${commit.message}</span>`)

                        eventsItens += `<li><strong>${event.repo.name}:</strong> ${commistsList}</li>`
                    }
                }
            })

            this.userProfile.innerHTML += `<div class="events section">
                                            <h2>Atividades</h2>
                                            <ul>${eventsItens}</ul>
                                           </div>` 
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }