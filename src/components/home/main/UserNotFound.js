import React from 'react';
import { Link } from 'react-router-dom';

export const UserNotFound = () =>
{
	return (
		<div className="main__user-not-found">
			<p>Usuario no encontrado</p>
			<p>Es posible que el enlace que has seguido sea incorrecto o que el usuario se haya eliminado</p>

			<Link to="/">Volver al inicio</Link>
		</div>
	)
}
