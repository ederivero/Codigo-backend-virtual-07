-- MySQL Workbench Forward Engineering
SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS,
    UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
    FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE,
    SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema muchos_muchos
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema muchos_muchos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `muchos_muchos` DEFAULT CHARACTER SET utf8;
USE `muchos_muchos`;
-- -----------------------------------------------------
-- Table `muchos_muchos`.`alumnos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muchos_muchos`.`alumnos` (
    `id` INT NOT NULL,
    `matricula` VARCHAR(45) NOT NULL,
    `nombre` VARCHAR(45) NOT NULL,
    `apellido` VARCHAR(45) NOT NULL,
    `localidad` VARCHAR(45) NOT NULL,
    `fecha_nacimiento` DATE NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `muchos_muchos`.`cursos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muchos_muchos`.`cursos` (
    `id` INT NOT NULL,
    `nombre` VARCHAR(45) NOT NULL,
    `fecha_inicio` DATE NOT NULL,
    `fecha_fin` DATE NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `muchos_muchos`.`alumnos_cursos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `muchos_muchos`.`alumnos_cursos` (
    `alumnos_id` INT NOT NULL,
    `cursos_id` INT NOT NULL,
    PRIMARY KEY (`alumnos_id`, `cursos_id`),
    INDEX `fk_alumnos_has_cursos_cursos1_idx` (`cursos_id` ASC) VISIBLE,
    INDEX `fk_alumnos_has_cursos_alumnos_idx` (`alumnos_id` ASC) VISIBLE,
    CONSTRAINT `fk_alumnos_has_cursos_alumnos` FOREIGN KEY (`alumnos_id`) REFERENCES `muchos_muchos`.`alumnos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_alumnos_has_cursos_cursos1` FOREIGN KEY (`cursos_id`) REFERENCES `muchos_muchos`.`cursos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;
SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;