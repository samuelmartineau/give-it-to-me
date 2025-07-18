BEGIN TRANSACTION;

CREATE TABLE "wineFamilies" (
    "id" integer not null primary key autoincrement, 
    "name" varchar(255) NOT NULL, 
    "_active" boolean default '1', 
    "createdAt" datetime default CURRENT_TIMESTAMP,
    "updatedAt" datetime default CURRENT_TIMESTAMP
);

CREATE TRIGGER wine_families_updated_at
AFTER UPDATE On wineFamilies
BEGIN
   UPDATE wineFamilies SET updatedAt = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;


CREATE TABLE "wines" (
    "id" integer not null primary key autoincrement, 
    "wineFamily" integer NOT NULL,
    "blur" varchar(255) NOT NULL,
    "name" varchar(255) NOT NULL, 
    "source" varchar(255), 
    "wineCategory" varchar(255),
    "wineType" varchar(255) NOT NULL, 
    "thumbnailFileName" varchar(255) NOT NULL, 
    "pictureFileName" varchar(255) NOT NULL, 
    "positionComment" varchar(255), 
    "isInBoxes" boolean NOT NULL,
    "bottleType" integer NOT NULL, 
    "year" integer NOT NULL, 
    "bottlesCount" integer NOT NULL, 
    "createdAt" datetime default CURRENT_TIMESTAMP,
    "updatedAt" datetime default CURRENT_TIMESTAMP,
    foreign key("wineFamily") references "wineFamilies"("id")
);


CREATE TRIGGER wines_updated_at
AFTER UPDATE On wines
BEGIN
   UPDATE wines SET updatedAt = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TABLE "bottles" (
    "id" integer not null primary key autoincrement, 
    "wineId" integer NOT NULL, 
    "box" integer NOT NULL, 
    "cell" integer NOT NULL, 
    "_deleted" boolean default '0', 
    "createdAt" datetime default CURRENT_TIMESTAMP,
    "updatedAt" datetime default CURRENT_TIMESTAMP,
    foreign key("wineId") references "wines"("id")
);


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



CREATE TABLE "favorites" (
    "id" integer not null primary key autoincrement, 
    "wineId" integer NOT NULL,
    "_deleted" boolean default '0', 
    "createdAt" datetime default CURRENT_TIMESTAMP,
    "updatedAt" datetime default CURRENT_TIMESTAMP,
    foreign key("wineId") references "wines"("id")
);

CREATE TRIGGER favorites_updated_at
AFTER UPDATE On favorites
BEGIN
   UPDATE favorites SET updatedAt = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;


CREATE TABLE "transactions" (
    "id" integer not null primary key autoincrement, 
    "type" TEXT CHECK( type IN ('ADDED','DELETED') ) NOT NULL,
    "wineId" integer,
    "bottleId" integer,
    "favoriteId" integer,
    "wineFamilyId" integer,
    "createdAt" datetime default CURRENT_TIMESTAMP,
    foreign key("wineId") references "wines"("id")
    foreign key("bottleId") references "bottles"("id")
    foreign key("favoriteId") references "favorites"("id")
    foreign key("wineFamilyId") references "wineFamilies"("id")
);

CREATE TRIGGER wine_added_transaction
AFTER INSERT On wines
BEGIN
   INSERT INTO transactions (wineId, type) VALUES (NEW.id, 'ADDED');
END;


CREATE TRIGGER wine_deleted_transaction
AFTER UPDATE On wines
WHEN old.bottlesCount > 0 AND new.bottlesCount = 0
BEGIN
   INSERT INTO transactions (wineId, type) VALUES (NEW.id, 'DELETED');
END;

CREATE TRIGGER bottle_deleted_transaction
AFTER UPDATE On bottles
WHEN new._deleted <> old._deleted AND new._deleted = 1
BEGIN
   INSERT INTO transactions (bottleId, type) VALUES (NEW.id, 'DELETED');
END;

CREATE TRIGGER favorite_added_transaction
AFTER INSERT On favorites
BEGIN
   INSERT INTO transactions (favoriteId, type) VALUES (NEW.id, 'ADDED');
END;

CREATE TRIGGER favorite_deleted_transaction
AFTER UPDATE On favorites
WHEN new._deleted <> old._deleted AND new._deleted = 1
BEGIN
   INSERT INTO transactions (favoriteId, type) VALUES (NEW.id, 'DELETED');
END;

CREATE TRIGGER wine_family_added_transaction
AFTER INSERT On wineFamilies
BEGIN
   INSERT INTO transactions (wineFamilyId, type) VALUES (NEW.id, 'ADDED');
END;

COMMIT;
