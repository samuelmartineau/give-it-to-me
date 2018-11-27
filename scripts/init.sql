
CREATE TABLE "wineFamilies" (
    "id" integer not null primary key autoincrement, 
    "name" varchar(255) NOT NULL, 
    "_active" boolean default '1', 
    "createdAt" datetime default CURRENT_TIMESTAMP,
    "updatedAt" datetime default CURRENT_TIMESTAMP)

CREATE TRIGGER wine_families_updated_at
AFTER UPDATE On wineFamilies
BEGIN
   UPDATE wineFamilies SET updatedAt = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;


CREATE TABLE "wines" (
    "id" integer not null primary key autoincrement, 
    "wineFamily" integer,
    "blur" varchar(255) NOT NULL,
    "name" varchar(255) NOT NULL, 
    "source" varchar(255), 
    "wineCategory" varchar(255),
    "wineType" varchar(255) NOT NULL, 
    "thumbnailFileName" varchar(255) NOT NULL, 
    "pictureFileName" varchar(255) NOT NULL, 
    "positionComment" varchar(255), 
    "isInBoxes" boolean NOT NULL,
    "isFavorite" boolean default '0', 
    "bottleType" integer NOT NULL, 
    "year" integer NOT NULL, 
    "bottlesCount" integer NOT NULL, 
    "createdAt" datetime default CURRENT_TIMESTAMP,
    "updatedAt" datetime default CURRENT_TIMESTAMP,
    foreign key("wineFamily") references "wineFamilies"("id")
    )


CREATE TRIGGER wines_updated_at
AFTER UPDATE On wines
BEGIN
   UPDATE wines SET updatedAt = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- INSERT INTO wines 
--         (name, year, wineFamily, blur, thumbnailFileName, pictureFileName, wineType, wineCategory, bottleType, isInBoxes, bottlesCount)
--         VALUES(
--         'Domaine de test',
--         2017,
--         72,
--         'null',
--         'null',
--         'null',
--         'RED',
--         'REGULAR',
--         1,
--         1,
--         6
--       )

-- UPDATE wines SET name = 'Domaine de test Sam' WHERE id = 1;


CREATE TABLE "bottles" (
    "id" integer not null primary key autoincrement, 
    "wineId" integer, 
    "box" integer NOT NULL, 
    "cell" integer NOT NULL, 
    "_deleted" boolean default '0', 
    "createdAt" datetime default CURRENT_TIMESTAMP,
    "updatedAt" datetime default CURRENT_TIMESTAMP,
    foreign key("wineId") references "wines"("id")
)

-- INSERT INTO bottles (wine_id, box, cell) VALUES
-- (1, 2, 1),
-- (1, 2, 2),
-- (1, 2, 3),
-- (1, 2, 4)

CREATE TRIGGER bottles_updated_at
AFTER UPDATE On bottles
BEGIN
   UPDATE bottles SET updatedAt = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER sync_bottles_count
AFTER UPDATE On bottles
WHEN new._deleted <> old._deleted AND new._deleted = 1
BEGIN
   UPDATE wines SET bottlesCount = bottlesCount - 1 WHERE id = new.wineId;
END;

-- UPDATE bottles SET _deleted = 1 WHERE id = 1;

CREATE TRIGGER sync_wine_count
AFTER UPDATE On wines
WHEN new.bottlesCount = 0
BEGIN
   DELETE FROM favorites WHERE wineId = new.id;
END;

CREATE TABLE "favorites" (
    "id" integer not null primary key autoincrement, 
    "wineId" integer, 
    "createdAt" datetime default CURRENT_TIMESTAMP,
    "updatedAt" datetime default CURRENT_TIMESTAMP,
    foreign key("wineId") references "wines"("id")
)

CREATE TRIGGER favorites_updated_at
AFTER UPDATE On favorites
WHEN new.bottlesCount = 0
BEGIN
   UPDATE favorites SET updatedAt = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
