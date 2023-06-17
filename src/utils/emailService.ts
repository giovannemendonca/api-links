import { env } from '@/env'
import nodemailer from 'nodemailer'

export class sendEmail {
	private transporter = nodemailer.createTransport({
		host: env.MAILTRAP_HOST,
		port: env.MAILTRAP_PORT,
		auth: {
			user: env.MAILTRAP_USER,
			pass: env.MAILTRAP_PASSWORD
		}
	})

	async forgotPassword(email: string, token: string) {
		const mailOptions = {
			from: 'noreply@links.com',
			to: email,
			subject: 'Reset Password',
			html: `
				<h1>Redefinição de Senha</h1>
				<p>Olá,</p>
				<p>Você solicitou uma redefinição de senha. Use o token a seguir para redefinir sua senha:</p>
				<p>
					<strong>Token:</strong>
					<span>${token}</span>
				</p>
			`,
			text: `${token}`
		}

		try {
			await this.transporter.sendMail(mailOptions)
		} catch (error) {
			throw new Error('Error sending email')
		}
	}

	async welcome(email: string) {
		const mailOptions = {
			from: 'noreply@links.com',
			to: email,
			subject: 'Bem-vindo',
			text: 'Welcome to Links',
			html: `
				<p>
					<h1>Bem-vindo!</h1>
					<p>Olá,</p>
					<p>Bem-vindo ao nosso aplicativo! Estamos muito felizes em tê-lo conosco.</p>
					<p>Aproveite todas as funcionalidades e recursos que oferecemos.</p>
					<p>Se precisar de ajuda ou tiver alguma dúvida, entre em contato conosco.</p>
					<p>Obrigado!</p>
				</p>
			`
		}

		try {
			await this.transporter.sendMail(mailOptions)
		} catch (error) {
			throw new Error('Error sending email')
		}
	}
}
