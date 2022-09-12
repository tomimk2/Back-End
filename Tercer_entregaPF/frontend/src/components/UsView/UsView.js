//  IMPORTS  //

// CSS
import './UsView.css';

// Foto
import foto from '../../images/nosotros.jpg';


//  COMPONENT   //
const UsView = () => {

    //  HTML   //
    return (
        <div className='container-us'>
            <div className='row-us'>
                <div className='col-us'>
                    <img src={foto} alt="Foto de una mujer" className='img-us'/>
                </div>
                <div className='col-us'>
                    <h2 className='h2-us'>Conocenos un poco más</h2>
                    <div className='recuadro-us'></div>
                    <p className='texto-us'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur veniam unde est debitis error repellendus facilis necessitatibus, similique delectus culpa quibusdam perferendis ab libero eaque fugit provident, sint amet nobis!
                        Laboriosam vero numquam vitae maxime magnam, ipsum esse quisquam fuga praesentium consectetur, alias necessitatibus aliquam veritatis neque fugit dolorum dolores quod, non labore commodi ullam odit unde. Voluptatum, beatae. Alias!
                        Tenetur velit ipsum suscipit nemo officiis minima fuga quod quas illo inventore beatae provident, ab, cumque voluptatem tempora odio dolores veniam sunt. Minus debitis nisi blanditiis perferendis doloribus, vitae itaque!
                        Iusto aliquam veritatis suscipit blanditiis illo, a officiis laudantium odit voluptatum perspiciatis enim quaerat accusantium perferendis, cum sunt quidem quos consectetur ducimus id! Dolores eveniet, a voluptatem nemo aliquam dolorem!
                        Perspiciatis quasi dolor quam optio deleniti inventore laborum, assumenda unde qui autem alias quidem a? Nostrum exercitationem iste sunt quo, voluptatem, sed nulla doloremque nobis sint vitae reprehenderit unde facilis!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UsView;