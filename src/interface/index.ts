export interface ChildProps {
	children: JSX.Element[] | JSX.Element;
}
export interface userProps {
	country: string;
	account_creation_date: string;
	date_of_birth: string;
	deactivated: boolean;
	email: string;
	first_name: string;
	address: string;
	gender: string;
	last_login: string | null;
	last_logout: string | null;
	last_name: string;
	notifications: Array<{message: string; timestamp: string} | string>;
	phone_number: string;
	profile_image_url: string;
	role: string;
	stickers_found: number;
	user_id: string;
	user_name: string;
}

export interface IDecodedUser {
	email: string;
	exp: number;
	iat: number;
	jti?: string;
	phone: string;
	role: string;
	token_type?: string;
	_id: string;
	fullname?: string;
}

export interface LoginProps {
	email: string;
	password: string;
}

export interface LayoutProps {
	children: JSX.Element[] | JSX.Element;
	Heading: string;
	Background: string;
}

export interface AdminLayoutProps {
	children: JSX.Element[] | JSX.Element;
	pageTitle: string;
}

export interface Coord {
	lon: number;
	lat: number;
}
