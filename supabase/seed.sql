-- Insert Restaurant Settings
INSERT INTO restaurant_settings (name, claim, description, email, phone, address, city, postal_code, country, logo_url)
VALUES (
  'Ürümchi Uigurisches Restaurant',
  'Willkommen bei Ürümchi. Unsere Küche, unsere Heimat.',
  'Authentische uigurische Küche in Karlsruhe',
  'uyghur_urumchi@outlook.de',
  '+49 721 123456',
  'Englerstraße 14',
  'Karlsruhe',
  '76131',
  'Deutschland',
  '/logo.png'
)
ON CONFLICT DO NOTHING;

-- Insert Categories
INSERT INTO categories (original_name, german_name, slug, description, note, sort_order, is_active)
VALUES
  ('Şöghuk Tamag', 'Salate', 'salate', '', '', 1, true),
  ('Tugrës', 'Teigtaschen', 'teigtaschen', '', '', 2, true),
  ('Schörpa', 'Suppen', 'suppen', '', '', 3, true),
  ('Läghmëns', 'Nudeln', 'nudeln', 'Läghmens sind handgezogene Nudeln aus der uigurischen Küche. Frisch zubereitet, kräftig gewürzt und seit Generationen ein Herzstück der Küche.', 'Alle Läghmens sind auch ohne Fleisch erhältlich und sind somit vegan.', 4, true),
  ('Gürük Tamag', 'Reisgerichte', 'reisgerichte', 'Feine Reisgerichte, frisch gekocht und mit ausgewählten Zutaten harmonisch abgeschmeckt.', '', 5, true),
  ('Göksiz Tamag', 'Vegetarische und vegane Gerichte', 'vegetarisch', '', 'Alle vegetarischen Gerichte werden mit einer Portion Reis serviert. Wahlweise auch mit Nudeln +1,50 €', 6, true),
  ('Köshumzi', 'Beilagen und Extras', 'beilagen', '', '', 7, true),
  ('Ichimliklër', 'Getränke', 'getraenke', '', '', 8, true)
ON CONFLICT (slug) DO NOTHING;

-- Get Category IDs for insertion
WITH cat_ids AS (
  SELECT 'salate'::text as slug, id FROM categories WHERE slug = 'salate'
  UNION ALL SELECT 'teigtaschen'::text as slug, id FROM categories WHERE slug = 'teigtaschen'
  UNION ALL SELECT 'suppen'::text as slug, id FROM categories WHERE slug = 'suppen'
  UNION ALL SELECT 'nudeln'::text as slug, id FROM categories WHERE slug = 'nudeln'
  UNION ALL SELECT 'reisgerichte'::text as slug, id FROM categories WHERE slug = 'reisgerichte'
  UNION ALL SELECT 'vegetarisch'::text as slug, id FROM categories WHERE slug = 'vegetarisch'
  UNION ALL SELECT 'beilagen'::text as slug, id FROM categories WHERE slug = 'beilagen'
  UNION ALL SELECT 'getraenke'::text as slug, id FROM categories WHERE slug = 'getraenke'
)

-- Insert Menu Items - Salate
INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_vegan, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'salate'), 1, 'Bansansir', 'Glasnudelsalat mit bunter Paprika, Weißkraut, Karotten, Knoblauch und Frühlingszwiebel', 8.00, true, true, true, 1
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_vegan, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'salate'), 2, 'Terhemek', 'Traditionell zubereiteter Gurkensalat mit Tomaten, Paprika und Zwiebeln', 8.00, true, true, true, 2
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_vegan, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'salate'), 5, 'Pidigän', 'Gebratene Aubergine mit Paprika und Frühlingszwiebeln', 8.00, true, true, true, 3
ON CONFLICT DO NOTHING;

-- Insert Menu Items - Teigtaschen
INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'teigtaschen'), 11, 'Tügrä', 'Zehn kleine gekochte Teigtaschen mit Rindfleischfüllung, serviert mit Joghurt', 9.90, false, true, 1
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'teigtaschen'), 13, 'Kizartma Tügra', 'Acht medium gebratene Teigtaschen mit Rindfleischfüllung, serviert mit Joghurt', 13.90, false, true, 2
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_active, note, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'teigtaschen'), 43, 'Piter Manta', 'Sechs große gedämpfte Teigtaschen mit Rindfleischfüllung, serviert mit Joghurt.', 13.90, false, true, 'Ca. 20 Minuten Wartezeit aufgrund des Dampfvorgangs.', 3
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'teigtaschen'), 14, 'Samsa', 'Hausgemachte Blätterteigtasche mit Rindfleisch und Zwiebeln', 3.00, false, true, 4
ON CONFLICT DO NOTHING;

-- Insert Menu Items - Suppen
INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'suppen'), 21, 'Qüqürä', 'Hausgemachte Teigtaschensuppe mit Rindfleisch, Mais und Erbsen', 12.50, false, true, 1
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_vegan, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'suppen'), 22, 'Tuhum', 'Uyghurische Eiersuppe mit Seetang, Frühlingszwiebeln, Mais und Erbsen', 5.90, true, false, true, 2
ON CONFLICT DO NOTHING;

-- Insert Menu Items - Nudeln (Läghmëns)
INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'nudeln'), 31, 'Traditionell', 'Handgezogene Weizennudeln mit gebratenem Rindfleisch, Sellerie, Paprika, Zwiebel, Chinakohl und Knoblauch', 14.90, false, true, 1
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'nudeln'), 32, 'Ürümchi', 'Handgezogene Weizennudeln mit gebratenem Rindfleisch, Chinakohl, Paprika, Morchelpilzen und Knoblauch', 17.50, false, true, 2
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'nudeln'), 33, 'Kesme', 'Kleingeschnittene handgezogene Weizennudeln mit Rindfleisch, fein geschnittenem Sellerie, Paprika, Zwiebel, Chinakohl und Knoblauch', 15.50, false, true, 3
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'nudeln'), 34, 'Qorup', 'Handgezogene Weizennudeln mit gebratenem Rindfleisch, Paprika, Zwiebel und Knoblauch, abgeschmeckt mit hauseigenen Gewürzen und Öl', 14.90, false, true, 4
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'nudeln'), 36, 'Gunchä', 'Kleingeschnittene handgezogene Weizennudeln mit gebratenem Rindfleisch, fein geschnittenem Sellerie, Paprika, Zwiebeln und Knoblauch, übergossen mit einer würzigen Brühe', 15.50, false, true, 5
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_active, options_text, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'nudeln'), 35, 'Toho Kordak', 'Handgezogene Breitbandnudeln mit Hähnchenfleisch am Knochen, bunter Paprika, Kartoffeln, Ingwer und Knoblauch, serviert in einer aromatischen Brühe', 15.50, false, true, 'Portionsgröße auch für 3 Personen erhältlich: 39,90 €', 6
ON CONFLICT DO NOTHING;

-- Insert Menu Items - Reisgerichte
INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_active, options_text, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'reisgerichte'), 45, 'Tohugoschi Meghiz Korimisi', 'Gebratene Hähnchenbrust mit Erdnüssen, Gemüse, Ingwer und Knoblauch, serviert mit Reis', 15.90, false, true, 'Wahlweise mit Weizennudeln +1,50 €', 1
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_active, options_text, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'reisgerichte'), 46, 'Tohugöschi Korimisi', 'Gebratene Hähnchenschenkel mit Gemüse, Chilischoten, Ingwer und Knoblauch, serviert mit Reis', 15.90, false, true, 'Wahlweise mit Breitbandnudeln +1,50 €', 2
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'reisgerichte'), 47, 'Kazan Kawab', 'Gebratenes Rindfleisch mit Paprika und Zwiebeln, serviert mit Reis', 23.50, false, true, 3
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_active, options_text, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'reisgerichte'), 49, 'Keren Kulak Korimisi', 'Gebratenes Rindfleisch mit Zwiebel, Paprika, Morchelpilzen, Ingwer und Knoblauch, serviert mit Reis', 16.50, false, true, 'Wahlweise mit Weizennudeln +1,50 €', 4
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_active, note, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'reisgerichte'), 0, 'Apa''s Wahl', 'Apa, unsere Küchenchefin und Mutter des Hauses, wählt jeden Monat ein ganz besonderes Gericht für euch aus. Ob Reis oder Nudeln, frisch, aromatisch und mit den besten Gewürzen unserer Heimat zubereitet. Ein Herzstück der Küche, das euch zeigt, wie Apa selbst kocht.', 15.00, false, true, 'Auf Anfrage erhältlich', 5
ON CONFLICT DO NOTHING;

-- Insert Menu Items - Vegetarisch
INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_vegan, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'vegetarisch'), 66, 'Pidigän Korimisi', 'Frittierte Aubergine mit bunter Paprika und Knoblauch, serviert in einer hausgemachten Süßsauer-Sauce', 13.50, true, true, true, 1
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_vegan, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'vegetarisch'), 67, 'Yeschil Purqak Korimisi', 'Gebratene Bohnen mit bunter Paprika, Zwiebel, Ingwer und Knoblauch', 12.90, true, true, true, 2
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, item_number, name, description, price, is_vegetarian, is_vegan, is_active, options_text, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'vegetarisch'), 68, 'Masch Uyutma Korimisi', 'Gebratener Tofu mit bunter Paprika, Frühlingszwiebel, Ingwer und Knoblauch, serviert in einer hausgemachten pikanten Sauce', 13.90, true, true, true, 'Wahlweise auch mit Nudeln +1,50 €', 3
ON CONFLICT DO NOTHING;

-- Insert Menu Items - Beilagen
INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'beilagen'), 'Extra Portion Reis', '', 2.50, true, true, true, 1
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'beilagen'), 'Extra Portion Nudeln', '', 3.00, true, true, true, 2
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'beilagen'), 'Extra Portion Rind', '', 3.50, false, true, 3
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, is_active, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'beilagen'), 'Uigurische Naan', '', 2.50, true, true, true, 4
ON CONFLICT DO NOTHING;

-- Insert Menu Items - Getränke
INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, is_active, price_label, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'getraenke'), 'Blackforest Still', '0,25 l und 0,7 l', 2.90, true, true, true, '2,90 € / 6,50 €', 1
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, is_active, price_label, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'getraenke'), 'Peterstaler Sprudel', '0,25 l und 0,7 l', 2.90, true, true, true, '2,90 € / 6,50 €', 2
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, is_active, price_label, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'getraenke'), 'Softgetränke', '0,33 l. Fritz Cola, Fritz Cola Zero, Fritz Orange, Paulaner Spezi', 3.80, true, true, true, '3,80 €', 3
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, is_active, price_label, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'getraenke'), 'Elephant Bay Eistee', '0,33 l. Sorten: Granatapfel, Blaubeere, Zitrone, Pfirsich', 3.90, true, true, true, '3,90 €', 4
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, is_active, price_label, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'getraenke'), 'Saft und Schorlen', '0,33 l. Orangensaft, Apfelschorle, Johannisbeerschorle', 3.80, true, true, true, '3,80 €', 5
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, is_active, price_label, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'getraenke'), 'Uludag Gazoz', '0,33 l', 2.90, true, true, true, '2,90 €', 6
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, is_active, price_label, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'getraenke'), 'Ayran', '0,25 l', 2.90, true, true, true, '2,90 €', 7
ON CONFLICT DO NOTHING;

INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_vegan, is_active, note, sort_order)
SELECT (SELECT id FROM categories WHERE slug = 'getraenke'), 'Uyghur Chay', 'Fein ausgewählte Rosen und weiße Blüten treffen auf aromatischen Schwarztee. Frisch aufgebrüht in unserer kleinen Kanne, ein duftiger, gemütlicher Genuss für alle Teeliebhaber.', 6.00, true, true, true, 'Optimal für 1–3 Personen', 8
ON CONFLICT DO NOTHING;

-- Insert Order Platforms
INSERT INTO order_platforms (name, url, supports_pickup, supports_delivery, fee_label, time_label, is_active, sort_order)
VALUES
  ('Wolt', 'https://wolt.com', true, true, 'Gebühren variieren', 'Bereit in 20-30 Min', true, 1),
  ('Lieferando.de', 'https://lieferando.de', true, true, 'Gebühren variieren', 'Bereit in 20-30 Min', true, 2)
ON CONFLICT DO NOTHING;

-- Insert Example Reviews
INSERT INTO reviews (reviewer_name, rating, text, review_date, source, is_active, sort_order)
VALUES
  ('Ahmed K.', 5, 'Fantastisches essen! Sehr authentisch und die Preise sind fair. Das Piter Manta war absolut köstlich!', CURRENT_DATE - 30, 'Google', true, 1),
  ('Maria L.', 5, 'Wunderbar! Endlich echte uigurische Küche in Karlsruhe. Die Bedienung war sehr freundlich.', CURRENT_DATE - 20, 'Google', true, 2),
  ('Thomas B.', 4, 'Gutes Essen mit großen Portionen. Etwas zu warm würzig für meinen Geschmack, aber trotzdem empfehlenswert.', CURRENT_DATE - 15, 'Google', true, 3),
  ('Fatima S.', 5, 'Das ist richtiges Heimat-Essen! Ich vermisse meine Oma''s Küche nicht mehr. Klasse!', CURRENT_DATE - 7, 'Google', true, 4)
ON CONFLICT DO NOTHING;

-- Insert Opening Hours (default)
INSERT INTO opening_hours (weekday, opens_at, closes_at, is_closed)
VALUES
  (0, '11:00'::time, '22:00'::time, false), -- Sunday
  (1, '11:00'::time, '23:00'::time, false), -- Monday
  (2, '11:00'::time, '23:00'::time, false), -- Tuesday
  (3, '11:00'::time, '23:00'::time, false), -- Wednesday
  (4, '11:00'::time, '23:00'::time, false), -- Thursday
  (5, '11:00'::time, '23:30'::time, false), -- Friday
  (6, '11:00'::time, '23:30'::time, false)  -- Saturday
ON CONFLICT (weekday) DO NOTHING;
