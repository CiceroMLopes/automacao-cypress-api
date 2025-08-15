// Comandos de suporte para requisições com retry em caso de 429 (rate limit)

function apiRequestWithRetry(requestOptions, attempt, maxRetries, delayMs) {
	const currentAttempt = attempt || 1;
	const max = maxRetries || 3;
	const delay = delayMs || 1000;

	return cy
		.request({
			failOnStatusCode: false,
			...requestOptions,
		})
		.then((response) => {
			if (response.status === 429 && currentAttempt < max) {
				return cy.wait(delay).then(() =>
					apiRequestWithRetry(requestOptions, currentAttempt + 1, max, delay)
				);
			}
			return response;
		});
}

Cypress.Commands.add('apiRequest', (requestOptions, maxRetries = 3, delayMs = 1000) => {
	return apiRequestWithRetry(requestOptions, 1, maxRetries, delayMs);
});

// Login que obtém o token JWT
Cypress.Commands.add('login', () => {
	return cy
		.apiRequest({
			method: 'POST',
			url: '/login',
			body: { email: 'fulano@qa.com', password: 'teste' },
		})
		.then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property('authorization');
			const token = response.body.authorization;
			Cypress.env('token', token);
			return token;
		});
});