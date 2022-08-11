import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MessageContainer } from './styles';

interface ToastProps {
	level: number;
	message: any;
}

interface MessageProps {
	level?: number;
	password?: string;
}

const SuccessMessage = ({ level, password }: MessageProps) => (
	<MessageContainer>
		<div>
			<b>Success !!</b>
		</div>
		<div>
			Level {level} password : <b>{password}</b>
		</div>
	</MessageContainer>
);

const ErrorMessage = () => (
	<MessageContainer>
		<div>
			<b>Incorrect !</b>
		</div>
		<div>Try again !</div>
	</MessageContainer>
);

const Toast = ({ message, level }: ToastProps) => {
	useEffect(() => {
		if (message?.type === 'message' && message?.data?.includes('verify')) {
			if (message?.data?.includes('Incorrect')) {
				toast.error(<ErrorMessage />, {
					autoClose: 1000,
					closeOnClick: true,
				});
			} else if (message?.data?.includes('Password')) {
				//verify: Correct! Password: JustWarmingUp
				const password = message?.data.split(':')[2]?.replace(/\s/g, '');
				toast(<SuccessMessage level={level} password={password} />, {
					autoClose: 1000,
					closeOnClick: true,
				});
			}
		}
        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [message]);

	return (
		<div>
			<ToastContainer />
		</div>
	);
};

export default Toast;
