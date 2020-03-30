test('Conhecendo o jest', () => {
    let number = null;
    expect(number).toBeNull();
    number = 10;
    expect(number).not.toBeNull();
    expect(number).toBe(10);
    expect(number).toEqual(10);
    expect(number).toBeGreaterThan(9);
    expect(number).toBeLessThan(11);
});

test('Manipulação de objetos', () => {
    const obj = {
        name: 'Osvaldo',
        email: 'o.r.jr@hotmail.com'
    };

    expect(obj).toHaveProperty('name', 'Osvaldo');
    expect(obj.name).toBe('Osvaldo');

    const obj2 = {
        name: 'Osvaldo',
        email: 'o.r.jr@hotmail.com'
    };

    expect(obj).toEqual(obj2);
    expect(obj).toBe(obj);
});