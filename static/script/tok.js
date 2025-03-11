let prof = ()=>{
    let inp= document.getElementById('inpt')
    let tok = document.cookie.slice(0,3)
    if (tok=='jwt') {
      inp.innerHTML =`<img class='profile' src='photos/profile.png'>`
      inp.setAttribute('href','/profile')
      
    }
  }
  
  prof();