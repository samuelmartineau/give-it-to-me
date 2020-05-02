INSERT INTO wines 
        (name, year, wineFamily, blur, thumbnailFileName, pictureFileName, wineType, wineCategory, bottleType, isInBoxes, bottlesCount)
        VALUES(
        'Domaine de test',
        2017,
        72,
        'null',
        'null',
        'null',
        'RED',
        'REGULAR',
        1,
        1,
        6
      );

INSERT INTO bottles (wineId, box, cell) VALUES
(1, 2, 1),
(1, 2, 2),
(1, 2, 3),
(1, 2, 4);


INSERT INTO favorites (wineId)  VALUES  (1);

INSERT OR REPLACE INTO favorites (wineId, _deleted, id) 
VALUES (1, 
    '0',
    (SELECT id FROM favorites WHERE wineId = 1)
);
