-- Insert de usuarios, un usuario es ADMIN y el otro tiene permisos normales --
-- Ambas contraseñas no hasheadas son: "sebaseba" --
INSERT INTO users (id, first_name, last_name, user_name, email, password, profile_photo, address, birth, gender, admin) VALUES (1, 'Sebastian', 'Rellihan', 'sebas0808', 's@g.com', '$2a$10$VG9l7AP.WbVcT0rsT9.pZOdsslb2eK3UzMg7ZNkf9AO.L5Q1qHclq', 'profile-photo-70c-1599089615544.jpg', 'La Lucila', '2000-08-08', 1, 1);
INSERT INTO users (id, first_name, last_name, user_name, email, password, profile_photo, address, birth, gender, admin) VALUES (2, 'Esteban', 'Quito', 'estebi', 'd@g.com', '$2a$10$s.hujoFdNoi..9QzFkbx8u5CEw0aa2wikcx4OPoczKLsUqsPSzwG6', 'profile-photo-joe-1599531537903.jpg', 'qwertyuiop', '2000-08-08', 1, 0); 

-- Insert de categorías de productos --
INSERT INTO categories (id, name) VALUES (1, 'Estaciones de trabajo');
INSERT INTO categories (id, name) VALUES (2, 'Escritorios');
INSERT INTO categories (id, name) VALUES (3, 'Sillas ergonómicas');
INSERT INTO categories (id, name) VALUES (4, 'Accesorios');

-- Insert de productos --
INSERT INTO products (id, name, description, brief_description, aditional_info, price, discount, stock, category_id) 
VALUES (1, 'Silla Butaca Gamer Melon', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernatur vel assumenda, beatae ab atque magni quam est numquam.', 'Sillon Silla Gamer Melon Butaca Gaming Almohadones Pc Reclinable Reforzada Estructura Met', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernatur vel assumenda, beatae ab atque magni quam est numquam consequuntur, dolores fugiat consequatur sequi tempore accusantium alias explicabo temporibus omnis soluta exercitationem quia voluptatum deserunt iste? ', 50000, 5, 15, 3);
INSERT INTO products (id, name, description, brief_description, aditional_info, price, discount, stock, category_id) 
VALUES (2, 'Silla De Escritorio Oficina', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernatur vel assumenda, beatae ab atque magni quam est numquam consequuntur, dolores fugiat ctium inventore obcaecati aliquid, debitis amet, ad enim aut. Qui ut et ab.', 'Silla De Escritorio Oficina Pc Giratoria Sillon Computadora', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernatur vel assumenda, beatae ab atque magni quam est numquam consequuntur, dolores fugiat consequatur sequi tempore accusantium alias explicabo temporibvoluptatem ratione quos rem accusantium inventore obcaecati aliquid, debitis amet, ad enim aut. Qui ut et ab.', 20000, 0, 11, 3);
INSERT INTO products (id, name, description, brief_description, aditional_info, price, discount, stock, category_id) 
VALUES (3, 'Puesto de trabajo en L', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernatur vel assumenda, beatae ab atque magni quam est numquam consequuntur, de sint dicta illo assumenda distinctio quae, voluptas sequi dolor libero quisquam magnam, mollitia ex accusantium soluta perferendis. Autem voluptatem ratione quos rem accusantium inventore obcaecati aliquid, debitis amet, ad enim aut. Qui ut et ab.', 'Puesto de trabajo escritorio En L Blanco Y Negro', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernatur vel assumenda, beatae ab atque magni quam est numquam consequuntur, dolores fugiat consequatur sequi tempore accusantium alias eero quisquam magnam, mollitia ex accusantium soluta perferendis. Autem voluptatem ratione quos rem accusantium inventore obcaecati aliquid, debitis amet, ad enim aut. Qui ut et ab.', 16000, 0, 10, 2);
INSERT INTO products (id, name, description, brief_description, aditional_info, price, discount, stock, category_id) 
VALUES (4, 'Escritorio de Melamina Premium', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernatur vel assumenda, beatae ab atque magni quam est menda distinctio quae, voluptas sequi dolor libero quisquam magnam, mollitia ex accusantium soluta perferendis. Autem voluptatem ratione quos rem accusantium inventore obcaecati aliquid, debitis amet, ad enim aut. Qui ut et ab.', 'Escritorio Mesa De Trabajo Oficina Hogar Melamina Premium Con 3 Cajones', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernatur vel assumenda, beatae ab atque magni quam est numquam consequuntur, dolores fugiat consequatur sequi tempore accusantium alias explicabo temporibus omnis soluta exercitationem quia volusantium soluta perferendis. Autem voluptatem ratione quos rem accusantium inventore obcaecati aliquid, debitis amet, ad enim aut. Qui ut et ab.', 12000, 0, 10, 2);
INSERT INTO products (id, name, description, brief_description, aditional_info, price, discount, stock, category_id) 
VALUES (5, 'Mesa Escritorio De Pared', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernatur vel assumenda, beatae ab atque magni quam est numquam consequuntur, dolores fuo quisquam magnam, mollitia ex accusantium soluta perferendis. Autem voluptatem ratione quos rem accusantium inventore obcaecati aliquid, debitis amet, ad enim aut. Qui ut et ab.', 'Mesa Escritorio De Pared Rebatible Plegable', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernatur vel assumenda, beatae ab atque magni quam est numquam consequuntur, dolores fugiat consequatur sequi tempore accusantium alias explicabo temporibus omnis soluta exercitationem quia voluptm soluta perferendis. Autem voluptatem ratione quos rem accusantium inventore obcaecati aliquid, debitis amet, ad enim aut. Qui ut et ab.', 15000, 0, 12, 2);
INSERT INTO products (id, name, description, brief_description, aditional_info, price, discount, stock, category_id) 
VALUES (6, 'Estacion de Trabajo Moderna', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernatur vel assumenda, beatae ab atque magni quam est numquam consequuntur, dolores fugiat consequatur sequi tempore accusantium alias explicab libero quisquam magnam, mollitia ex accusantium soluta perferendis. Autem voluptatem ratione quos rem accusantium inventore obcaecati aliquid, debitis amet, ad enim aut. Qui ut et ab.', 'Estacion de Trabajo - Silla y Escritorio Moderna', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernatur vel assumenda, beatae ab atque magni quam est numquam consequuntur, dolores fugiat consequatur sequi tempore accusantccusantium soluta perferendis. Autem voluptatem ratione quos rem accusantium inventore obcaecati aliquid, debitis amet, ad enim aut. Qui ut et ab.', 29990, 0, 5, 1);
INSERT INTO products (id, name, description, brief_description, aditional_info, price, discount, stock, category_id) 
VALUES (7, 'Estación de trabajo completa', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernatur vel assumenda, beatae ab atque magni quam est numquam consequuntuat inventvoluptas sequi dolor libero quisquam magnam, mollitia ex accusantium soluta perferendis. Autem voluptatem ratione quos rem accusantium inventore obcaecati aliquid, debitis amet, ad enim aut. Qui ut et ab.', 'Combo Escritorio En L 165m + Silla Operativa + Biblioteca', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernatur vel assumenda, beatae ab atque magni quam est numquam consequuntur, dolores fugiat consequatur sequi tempore accusantium alias explicabo temporibus omnis soluta exercitationem quia voluptatum deserunt iste? Assumenda iur libero quisquam magnam, mollitia ex accusantium soluta perferendis. Autem voluptatem ratione quos rem accusantium inventore obcaecati aliquid, debitis amet, ad enim aut. Qui ut et ab.', 35000, 5, 8, 1);
INSERT INTO products (id, name, description, brief_description, aditional_info, price, discount, stock, category_id) 
VALUES (8, 'Estación de trabajo premium', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernaturiquid quibusdam, asperiores atque sint dicta illo assumenda distinctio quae, voluptas sequi dolor libero quisquam magnam, mollitia ex accusantium soluta perferendis. Autem voluptatem ratione quos rem accusantium inventore obcaecati aliquid, debitis amet, ad enim aut. Qui ut et ab.', 'Escritorio con cajonera, silla ergonómica, lámpara y lapicero', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernatur vel assumenda, beatae ab atque magni quam est numquam consequuntur, dolores fugiat consequatur sequi tempore accusantium alias explicabo temporibus omnis soluta exercitationem quia voluptatum deserunt iste? Assumenda iusutem voluptatem ratione quos rem accusantium inventore obcaecati aliquid, debitis amet, ad enim aut. Qui ut et ab.', 50000, 10, 4, 1);
INSERT INTO products (id, name, description, brief_description, aditional_info, price, discount, stock, category_id) 
VALUES (9, 'Combo Accesorios Gamer', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernatur vel assumenda, beatae ab atque magni quam est numquam consequuntaerat ires atque sint dicta illo assumenda distinctio quae, voluptas sequi dolor libero quisquam magnam, mollitia ex accusantium soluta perferendis. Autem voluptatem ratione quos rem accusantium inventore obcaecati aliquid, debitis amet, ad enim aut. Qui ut et ab.', 'Mouse + Teclado + Auricular + Pad', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus aspernatur vel assumenda, beatae ab atque magni quam est numquam consequuaccusantium soluta perferendis. Autem voluptatem ratione quos rem accusantium inventore obcaecati aliquid, debitis amet, ad enim aut. Qui ut et ab.', 8000, 0, 20, 4);

-- Insert de imágenes de productos --
INSERT INTO images VALUES (DEFAULT, 1, "image-mel-1600033685784.webp");
INSERT INTO images VALUES (DEFAULT, 1, "image-mel-1600033685785.webp");
INSERT INTO images VALUES (DEFAULT, 1, "image-mel-1600033685787.webp");
INSERT INTO images VALUES (DEFAULT, 2, "image-sil-1600034079176.webp");
INSERT INTO images VALUES (DEFAULT, 2, "image-sil-1600034079178.webp");
INSERT INTO images VALUES (DEFAULT, 2, "image-sil-1600034079179.webp");
INSERT INTO images VALUES (DEFAULT, 3, "image-esc-1600035233087.webp");
INSERT INTO images VALUES (DEFAULT, 3, "image-esc-1600035233088.webp");
INSERT INTO images VALUES (DEFAULT, 3, "image-esc-1600035233089.webp");
INSERT INTO images VALUES (DEFAULT, 4, "image-esc-1600035918026.webp");
INSERT INTO images VALUES (DEFAULT, 4, "image-esc-1600035918027.webp");
INSERT INTO images VALUES (DEFAULT, 4, "image-esc-1600035928497.webp");
INSERT INTO images VALUES (DEFAULT, 4, "image-esc-1600035928498.webp");
INSERT INTO images VALUES (DEFAULT, 5, "image-ple-1600036086716.webp");
INSERT INTO images VALUES (DEFAULT, 5, "image-ple-1600036086718.webp");
INSERT INTO images VALUES (DEFAULT, 5, "image-ple-1600036086719.webp");
INSERT INTO images VALUES (DEFAULT, 5, "image-ple-1600036086721.webp");
INSERT INTO images VALUES (DEFAULT, 5, "image-ple-1600036086724.webp");
INSERT INTO images VALUES (DEFAULT, 6, "image-est-1600036371583.webp");
INSERT INTO images VALUES (DEFAULT, 6, "image-est-1600036371584.webp");
INSERT INTO images VALUES (DEFAULT, 7, "image-est-1600036629946.webp");
INSERT INTO images VALUES (DEFAULT, 8, "image-com-1600038329244.webp");
INSERT INTO images VALUES (DEFAULT, 8, "image-com-1600038329245.webp");
INSERT INTO images VALUES (DEFAULT, 8, "image-com-1600038329246.webp");
INSERT INTO images VALUES (DEFAULT, 9, "image-acc-1600037564624.webp");
INSERT INTO images VALUES (DEFAULT, 9, "image-acc-1600037640628.webp");
INSERT INTO images VALUES (DEFAULT, 9, "image-acc-1600037640629.webp");
INSERT INTO images VALUES (DEFAULT, 9, "image-acc-1600037640630.webp");

-- Insert de métodos de envíos (shippings)--
INSERT INTO shippings VALUES (DEFAULT, "Retiro por sucursal");
INSERT INTO shippings VALUES (DEFAULT, "Envío por correo");