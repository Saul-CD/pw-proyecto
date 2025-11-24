export const Cart = {
    items: JSON.parse(localStorage.getItem("cart")) || [],

    agregar: (product) => {
        const exist = Cart.items.find((i) => i.id === product.id);
        if (exist) exist.qty++;
        else Cart.items.push({ ...product, qty: 1 });
        Cart.guardar();
    },
    actualizar: (id, n) => {
        const item = Cart.items.find((i) => i.id === id);
        if (item) {
            item.qty += n;
            if (item.qty <= 0) Cart.items = Cart.items.filter((i) => i.id !== id);
            Cart.guardar();
        }
    },
    guardar: () => {
        localStorage.setItem("cart", JSON.stringify(Cart.items));
        Cart.renderBadge();
    },
    renderBadge: () => {
        const total = Cart.items.reduce((acc, i) => acc + i.qty, 0);
        const cartCount = document.getElementById("cartCount");
        cartCount.innerText = total;
        cartCount.style.display = total > 0 ? "block" : "none";
    },
    mostrarModal: () => {
        const list = document.getElementById("listaCarrito");
        let total = 0;
        list.innerHTML = Cart.items
            .map((producto) => {
                total += producto.precio * producto.qty;
                return `
                    <li class="cart-item">
                        <div style="display:flex; align-items:center;">
                            <img src="${producto.imagenes[0]}">
                            <div><b>${producto.nombre}</b><br>$${producto.precio}</div>
                        </div>
                        <div class="cart-controls">
                            <i class="material-icons tiny red-text" style="cursor:pointer" onclick="window.updateCart('${producto.id}', -1)">remove</i>
                            <span>${producto.qty}</span>
                            <i class="material-icons tiny green-text" style="cursor:pointer" onclick="window.updateCart('${producto.id}', 1)">add</i>
                        </div>
                    </li>`;
            })
            .join("");
        document.getElementById("cartTotal").innerText = "$" + total.toFixed(2);
    },
};
