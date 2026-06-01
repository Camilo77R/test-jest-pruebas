const { UserManager } = require('../../src/exercises/users/user.manager');

describe('Ejercicio 3 - Gestor de usuarios', () => {
  let userManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  test('agrega usuario y lo deja disponible en la lista', () => {
    const users = userManager.addUser('Laura');
    expect(users).toContain('Laura');
  });

  test('busca un usuario existente', () => {
    userManager.addUser('Miguel');
    expect(userManager.findUser('Miguel')).toBe(true);
  });

  test('elimina un usuario existente', () => {
    userManager.addUser('Camila');
    const wasRemoved = userManager.removeUser('Camila');

    expect(wasRemoved).toBe(true);
    expect(userManager.findUser('Camila')).toBe(false);
  });

  test('retorna false al intentar eliminar un usuario inexistente', () => {
    expect(userManager.removeUser('NoExiste')).toBe(false);
  });

  test('evita nombres vacíos', () => {
    expect(() => userManager.addUser('   ')).toThrow('no puede estar vacío');
  });
});
