
--
-- Base de datos: `users_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE "users" (
  "id" int(11) NOT NULL,
  "user_name" varchar(40) NOT NULL,
  "email" varchar(40) NOT NULL,
  "password" varchar(20) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT AK_TransactionID UNIQUE(Id)
)

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO "users" ("id", "user_name", "email", "password") VALUES
(1, 'Emily', 'emily@gmail.com', 'emily123');