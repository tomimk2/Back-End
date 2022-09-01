const socket = io();

socket.on('log', mail => {
    hbsLog(mail)
        .then(html => {
            document.querySelector('#log').innerHTML = html;
        });
});

const hbsLog = (mail) => {
    return fetch('hbs/log.handlebars')
        .then(res => res.text())
        .then(log => {
            const hbs = Handlebars.compile(log);
            const html = hbs({mail});
            return html;
        });
};

socket.on('formProductos', () => {
    hbsForm()
        .then(html => {
            document.querySelector('#formProductos').innerHTML = html;
            const addProduct = document.querySelector('#formProductos').querySelector('#addProductForm');
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
        });
});

const hbsForm = () => {
    return fetch('hbs/formProductos.handlebars')
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
            if (productos === null) {
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
                };
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
            const msjs = document.querySelector("#mensajes");
            msjs.querySelector('#chat').innerHTML = html;
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


