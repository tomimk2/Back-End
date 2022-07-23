const socket = io();

const indexContainer = document.querySelector('#indexContainer');
const mockContainer = document.querySelector('#mockContainer');

if (document.location.pathname === '/') {
    indexContainer.removeAttribute("class", "d-none");
    mockContainer.setAttribute("class", "d-none");

    socket.on('form', () => {
        hbsForm()
            .then(html => {
                document.querySelector('#form').innerHTML = html;
                const addProduct = document.querySelector('#form').querySelector('#addProductForm');
                addProduct.addEventListener('submit', e => {
                    e.preventDefault();
                    const product = {
                        title: addProduct[0].value,
                        price: addProduct[1].value,
                        thumbnail: addProduct[2].value
                    };
                
                    socket.emit('addProduct', product);
                    addProduct.reset();
                });
            })
    });
    
    const hbsForm = () => {
        return fetch('hbs/form.handlebars')
            .then(res => res.text())
            .then(form => {
                const hbs = Handlebars.compile(form);
                const html = hbs();
                return html;
            });
    };
    
    socket.on('tablaProductos', productos => {
        hbsTable(productos)
            .then(html => {
                document.querySelector('#tabla').innerHTML = html;
            });
    });
    
    const hbsTable = (productos) => {
        return fetch('hbs/table.handlebars')
            .then(res => res.text())
            .then(table => {
                let exists = true;
                const hbs = Handlebars.compile(table);
                if (productos.length === 0) {
                    exists = false;
                };
    
                const html = hbs({productos, exists});
                return html;
            });
    };
    
    socket.on('mensajes', () => {
        hbsMensaje()
            .then(html => {
                document.querySelector('#mensajes').innerHTML = html;
                const newMessage = document.querySelector('#mensajes').querySelector('#newMessageForm');
    
                newMessage.addEventListener('submit', e => {
                    e.preventDefault();
                
                    if (((!newMessage[0].value) && (!newMessage[1].value)) || ((!newMessage[0].value) || (!newMessage[1].value))) {
                        alert("Necesitás completar los campos para poder usar el chat");
                    } else {
                        const msj = {
                            mail: newMessage[0].value,
                            date: new Date().toLocaleString('es-AR'),
                            message: newMessage[1].value,
                        };
                        socket.emit('addMsj', msj);
                        newMessage.reset();
                    }
                });
            });
    });
    
    const hbsMensaje = () => {
        return fetch('hbs/mensajes.handlebars')
            .then(res => res.text())
            .then(mensajes => {
                const hbs = Handlebars.compile(mensajes);
                const html = hbs();
                return html;
            });
    };
    
    socket.on('chat', msj => {
        hbsChat(msj)
            .then(html => {
                document.querySelector('#chat').innerHTML = html;
            });
    });
    
    const hbsChat = (msj) => {
        return fetch('hbs/chat.handlebars')
            .then(res => res.text())
            .then(chat => {
                const hbs = Handlebars.compile(chat);
                const html = hbs({msj});
                return html;
            });
    };
    
} else if (document.location.pathname === '/mock') {
    mockContainer.removeAttribute("class", "d-none");
    indexContainer.setAttribute("class", "d-none");

    socket.on('mockTable', mockProduct => {
        hbsMock(mockProduct)
            .then(html => {
                document.querySelector('#mock').innerHTML = html;
            });
    });
    
    const hbsMock = (mockProduct) => {
        return fetch('hbs/mockTable.handlebars')
            .then(res => res.text())
            .then(mock => {
                const hbs = Handlebars.compile(mock);
                const html = hbs({mockProduct});
                return html;
            });
    };
};





