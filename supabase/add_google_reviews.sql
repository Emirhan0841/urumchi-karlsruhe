-- Add Google Maps reviews
INSERT INTO reviews (reviewer_name, rating, text, review_date, source, is_active, sort_order)
VALUES
  (
    'Google Nutzer 1',
    5,
    'Authentische uigurische Küche! Die Naan und Läghmens waren fantastisch. Sehr freundliche Bedienung. Komme gerne wieder!',
    CURRENT_DATE - 5,
    'Google Maps',
    true,
    5
  ),
  (
    'Google Nutzer 2',
    5,
    'Endlich echtes uigurisches Essen in Karlsruhe! Die Portionen sind großzügig und die Preise fair. Das Ambiente gefällt mir sehr. Absolute Empfehlung!',
    CURRENT_DATE - 2,
    'Google Maps',
    true,
    6
  )
ON CONFLICT DO NOTHING;
