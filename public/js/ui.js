export const UI = {
    init: () => {
        M.Modal.init(document.querySelectorAll(".modal"));
        M.FormSelect.init(document.querySelectorAll("select"));
    },
    estaCargando: (show) => {
        document.getElementById("loadingOverlay").style.display = show ? "flex" : "none";
    },

    toggleAdmin: (usuario) => {
        const display = usuario ? "block" : "none";

        // Mostrar/Ocultar Panel de Admin
        document.getElementById("adminPanelContainer").style.display = display;
        document.getElementById("btnLoginLi").style.display = usuario ? "none" : "block";
        document.getElementById("btnLogoutLi").style.display = display;

        // Mostrar/Ocultar botones de editar/borrar en las tarjetas
        document.querySelectorAll(".admin-actions").forEach((e) => (e.style.display = usuario ? "flex" : "none"));
    },
    mostrarProductos: (productos, user) => {
        const container = document.getElementById("listaProductos");
        const html = productos
            .map((p) => {
                const imagenes = p.imagenes;

                const carouselSlides = imagenes
                    .map(
                        (url) => `
                            <a class="carousel-item" href="#!" onclick="window.verDetalle('${p.id}')" style="cursor: pointer;">
                                <img src="${url}" style="object-fit: cover; height: 100%; width: 100%;">
                            </a>`
                    )
                    .join("");

                const display = user ? "flex" : "none";
                const displayBuy = user ? "none" : "inline-block";

                return `
                    <div class="col s12 m6 l4 producto" id="prod-${p.id}">
                        <div class="card hoverable" style="border-radius: 20px; overflow: hidden;">
                            
                            <div class="card-image" style="height: 250px;"> 
                                <div class="carousel carousel-slider center" style="height: 100%;">
                                    ${carouselSlides}
                                </div>

                                <a class="btn-floating halfway-fab orange darken-2" 
                                style="display: ${displayBuy}"
                                onclick="window.agregarCarrito('${p.id}')">
                                    <i class="material-icons">add_shopping_cart</i>
                                </a>

                                <div class="admin-actions" style="display:${display}; position:absolute; top:10px; right:10px; gap:5px; z-index: 999;">
                                    <a class="btn-floating blue btn-small" onclick="window.editarProducto('${p.id}')">
                                        <i class="material-icons">edit</i>
                                    </a>
                                    <a class="btn-floating red btn-small" onclick="window.eliminarProducto('${p.id}')">
                                        <i class="material-icons">delete</i>
                                    </a>
                                </div>
                            </div>

                            <div class="card-content">
                                <span class="card-title truncate grey-text text-darken-4" 
                                    onclick="window.verDetalle('${p.id}')" 
                                    style="cursor: pointer; font-weight: bold; font-size: 1.2rem;">
                                    ${p.nombre}
                                </span>
                                
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                    <div class="chip small blue lighten-5 blue-text">${p.categoria || "General"}</div>
                                    <span class="green-text text-darken-2" style="font-weight: bold; font-size: 1.3rem;">$${Number(
                                        p.precio
                                    ).toFixed(2)}</span>
                                </div>

                                <p class="truncate grey-text">${p.descripcion || "Sin descripción"}</p>
                            </div>
                        </div>
                    </div>`;
            })
            .join("");

        container.innerHTML = html;

        // Inicializar carouseles
        setTimeout(() => {
            const carruseles = container.querySelectorAll(".carousel");
            if (carruseles.length > 0) {
                M.Carousel.init(carruseles, {
                    fullWidth: true,
                    indicators: true,
                    duration: 200,
                });
            }
        }, 50);
    },
};
