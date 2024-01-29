import './modal.css'

const Modal = ({ active, setActive }) => {
	return (
		<div
			className={active ? 'modal active' : 'modal'}
			onClick={() => setActive(false)}
		>
			{active.text}
			<div className='modal__content' onClick={e => e.stopPropagation()}></div>
		</div>
	)
}

export default Modal
