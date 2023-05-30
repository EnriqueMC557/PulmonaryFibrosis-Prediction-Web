function showPreview(event){
	if(event.target.files.length > 0){
	  let src = URL.createObjectURL(event.target.files[0]);
	  let preview = document.getElementById("selected-image-preview");
	  preview.src = src;
	  preview.style.display = "block";
	}
}

function displayLoading() {
    let loader = document.querySelector("#loading");
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

function hideLoading() {
    let loader = document.querySelector("#loading");
    loader.classList.remove("display");
}

async function postData(url, data) {
    return await fetch(url, {
        method: 'POST',
        body: data
    })
}

async function makePrediction(){
	let valid_fvc = document.getElementById("fvc").checkValidity();
    let valid_weeks = document.getElementById("weeks").checkValidity();
    let valid_age = document.getElementById("age").checkValidity();

    let fvc = document.getElementById("fvc").value;
    let weeks = document.getElementById("weeks").value;
    let age = document.getElementById("age").value;
    let smoking = document.getElementById("smoking").value;
    let gender = document.getElementById("gender").value;
    let image = document.getElementById("selected-image").files[0];
    let url = "/predict";

	/* if (!valid_fvc || !valid_weeks || !valid_age){ */
    if (true){
        Swal.fire({
            icon: "error",
            title: 'Datos inválidos',
            text: "Al menos un campo contiene datos inválidos. Por favor, verifique los datos ingresados.",
          });
        /* return; */
    }

    let data = new FormData();
    data.append("fvc", fvc);
    data.append("weeks", weeks);
    data.append("age", age);
    data.append("smoking", smoking);
    data.append("gender", gender);
    data.append("image", image);
    
	displayLoading()
    postData(url, data)
        .then(response => response.json()
            .then(json => {
                hideLoading()
                if (json["prediction"] == 0){
                    document.getElementById("result").value = "No daño pulmonar";
                } else {
                    document.getElementById("result").value = "Daño pulmonar";
                }
                
            }))
}
