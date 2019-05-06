const url = 'https://3000-c0761acb-4dee-4235-bfcf-37c8e1f7b1b4.ws-eu0.gitpod.io';
class Fetch{

    static registration(nome, cognome, email, password){
        return(
            new Promise((resolve,reject)=>{
                resolve(fetch(url+'/utenti',{
                    method: 'PUT',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        'nome': nome,
                        'cognome': cognome,
                        'email': email,
                        'password': password
                        })
                    }).then(res => res.json())
                )
            })
        )
    }

    static login(email, password){
        return new Promise((resolve, reject) =>{
            resolve(fetch(url+'/utenti',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    'email': email,
                    'password': password,
                })
            }).then(res => res.json())
            )
        })
    }

    static addEvento(token, dataInizio, dataFine, giorniNonDisponibili, intervallo){
        return new Promise((resolve, reject) =>{
            resolve(
                fetch(url+'/evento', {
                    method: 'POST',
                    headers: new Headers({
                            'Authorization': 'Bearer '+ token,
                            'Content-Type':'application/json'
                    }),
                    body: JSON.stringify({
                        'dataInizio': dataInizio,
                        'dataFine' : dataFine,
                        'giorni': giorniNonDisponibili,
                        'lasso' : intervallo,
                    })

                }).then(res => res.json())
            )
        })

    }

    static getEventi(){
        return new Promise((resolve, reject)=>{
            resolve(
                fetch(url+'/evento', {
                    method: 'GET',
                    headers: {'Content-Type':'application/json'},
                }).then(res => res.json())
            )
        })
    }

}export default Fetch