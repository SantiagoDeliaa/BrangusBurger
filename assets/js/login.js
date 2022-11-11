const form = document.querySelector('.form')


const formulario = document.createElement('div')


const html =

`
  <form action="http://localhost:8080/auth/login" method="post" onsubmit="iniciarSesion" style="width: 50%; margin-left:auto; margin-right: auto; margin-top:100px ">

  <div class="form-outline mb-4">
    <input type="nombre" id="nombre" class="form-control" name="nombre" />
    <label class="form-label" for="nombre">Nombre</label>
  </div>

  <div class="form-outline mb-4">
    <input type="email" id="email" class="form-control" name="email" />
    <label class="form-label" for="email">Email</label>
  </div>

  <div class="form-outline mb-4">
    <input type="password" id="password" name="password" class="form-control" />
    <label class="form-label" for="password">Password</label>
  </div>

  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label class="form-check-label" for="form2Example31"> Remember me </label>
      </div>
    </div>

    <div class="col">
      <!-- Simple link -->
      <a href="#!">Forgot password?</a>
    </div>
  </div>

  <!-- Submit button -->
  <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>

  <!-- Register buttons -->
  <div class="text-center">
    <p>Not a member? <a href="#!">Register</a></p>
    <p>or sign up with:</p>
    <button type="button" class="btn btn-link btn-floating mx-1">
      <i class="fab fa-facebook-f"></i>
    </button>

    <button type="button" class="btn btn-link btn-floating mx-1">
      <i class="fab fa-google"></i>
    </button>

    <button type="button" class="btn btn-link btn-floating mx-1">
      <i class="fab fa-twitter"></i>
    </button>

    <button type="button" class="btn btn-link btn-floating mx-1">
      <i class="fab fa-github"></i>
    </button>
  </div>
</form>`

        formulario.innerHTML = html;
        form.appendChild(formulario)