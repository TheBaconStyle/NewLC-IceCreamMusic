'use server';
import { functional } from 'sdk';

export async function oauth() {
	return await functional.v1.auth.oauth.OAuthSignin(
		{
			host: 'http://localhost:5000',
			headers: {
				Authorization:
					'e37c05e161a752303a6b173ae6f988c5698fd86d84a4f9b2afee231b3da97e2b',
			},
		},
		{ access_token: '1234567890' },
	);
}
