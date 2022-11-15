function myFunction(){
    Swal.fire({
        title: 'Enter your ROBLOX username',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Login',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return fetch(`//api.github.com/users/${login}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
       }).then((result) => {
         if (result.isConfirmed) {
           Swal.fire({
             title: `${result.value.login}'s avatar`,
             imageUrl: result.value.avatar_url
           })
         }
       })
}