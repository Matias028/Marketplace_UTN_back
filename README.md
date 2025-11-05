***Trabajo final UTN BACKEND***

Este proyecto tiene la finalidad de aplicar todos los conocimientos adquiridos en la cursada y de cumplir con los requisitos solicitados.
Decidi no hacer un 'SLACK' ya que al no utilizarlo nunca , fue un ejemplo que me costo mucho adaptarme. 

La web tiene el objetivo de ser una compra/venta de autos , donde un usuario se registra y al ingresar a la plataforma puede publicar un vehiculo para la venta. Puede agregar mas de 1 vehiculo, puede eliminar y editar cada publicacion .

En la pagina principal apareceran todas las publicaciones de los usuarios, mostrando la informacion de cada una y en caso de querer contactar al vendedor, se le enviara un whatsapp al mismo apretando el boton Contactar vendedor.

Utilice para la DB *MySQL* ya que me siento mas comodo que con MongoDB.
En cuanto al codigo , utilice NodeJS con Express y las librerias fueron :
  - *nodemailer* para el control de Mails de validacion.
  - *sequelize*  para el control de la DB.
  - *dotenv* para las variables de entorno .
  - *bcrypt* para encriptacion de contraseñas .
  - *jsonwebtoken* para tokens .

Se usaron middelwares para validar mail , clave y acceso con token . 
En la DB , desplegue en CLeverCloud , teniendo muchos problemas en la capa gratuita ( maximo de 5 conexiones ), por eso en la config de la DB en el codigo agrege :

  *pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      }*
      
Me falto agregar un *recupero de contraseña* por falta de tiempo y hacer un listado de publicaciones en la pagina de inicio (que solo aparezcan maximo 10 vehiculos y la cantidad de paginas restantes) . 



Aprovechando el espacio , queria agradecer por la cursada, tanto al tutor Lautaro como al profesor Matias . La verdad que aprendi un monton, siempre fueron muy atentos y respetuosos , respondiendo cada duda con paciciencia y claridad . 
