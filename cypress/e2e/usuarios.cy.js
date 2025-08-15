const uniqueEmail = () => `user_${Date.now()}_${Math.floor(Math.random() * 1e6)}@mail.com`;

describe('Desafio de Automação de Testes de API - Validações sem autenticação', () => {
	before(() => {
		cy.login();
	});

	it('CT01 - Login com dados inválidos', () => {
		cy.apiRequest({
			method: 'POST',
			url: '/login',
			body: { email: 'invalido@mail.com', password: 'errada' },
		}).then((response) => {
			expect(response.status).to.eq(401);
		});
	});

	it('CT02 - Listagem de usuários', () => {
		cy.apiRequest({ method: 'GET', url: '/usuarios' }).then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property('quantidade');
			expect(response.body).to.have.property('usuarios').that.is.an('array');
		});
	});

	describe('Desafio de Automação de Testes de API - Validações com autenticação', () => {
		let createdUserId;
		let createdEmail;

		it('CT03 - Criação de usuário com dados válidos', function () {
			createdEmail = uniqueEmail();
			const token = Cypress.env('token');
			expect(token, 'token carregado').to.be.a('string').and.to.have.length.greaterThan(0);
			cy.apiRequest({
				method: 'POST',
				url: '/usuarios',
				headers: { authorization: token },
				body: {
					nome: 'Usuário Teste',
					email: createdEmail,
					password: '123456',
					administrador: 'true',
				},
			}).then((response) => {
				expect(response.status).to.be.oneOf([201, 200]);
				expect(response.body).to.have.property('_id');
				createdUserId = response.body._id;
			});
		});

		it('CT04 - Validar criação de usuário por id', () => {
			expect(createdUserId, 'id criado').to.be.a('string').and.to.have.length.greaterThan(0);
			cy.apiRequest({ method: 'GET', url: `/usuarios/${createdUserId}` }).then((response) => {
				expect(response.status).to.eq(200);
				expect(response.body).to.have.property('email', createdEmail);
			});
		});

		it('CT05 - Atualização de usuário', function () {
			const newName = 'Usuário Teste Atualizado';
			const token = Cypress.env('token');
			cy.apiRequest({
				method: 'PUT',
				url: `/usuarios/${createdUserId}`,
				headers: { authorization: token },
				body: {
					nome: newName,
					email: createdEmail,
					password: '123456',
					administrador: 'true',
				},
			}).then((response) => {
				expect(response.status).to.eq(200);
			});
		});

		it('CT06 - Criação de usuário com email duplicado', function () {
			const token = Cypress.env('token');
			cy.apiRequest({
				method: 'POST',
				url: '/usuarios',
				headers: { authorization: token },
				body: {
					nome: 'Usuário Duplicado',
					email: createdEmail,
					password: '123456',
					administrador: 'false',
				},
			}).then((response) => {
				expect(response.status).to.be.oneOf([400, 409]);
			});
		});

		it('CT07 - Excluir usuário com sucesso', function () {
			const token = Cypress.env('token');
			cy.apiRequest({
				method: 'DELETE',
				url: `/usuarios/${createdUserId}`,
				headers: { authorization: token },
			}).then((response) => {
				expect(response.status).to.eq(200);
			});
		});
	});
});