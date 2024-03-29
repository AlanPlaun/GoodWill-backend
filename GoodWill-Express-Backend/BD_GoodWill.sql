USE [master]
GO
/****** Object:  Database [ProyectoFinal]    Script Date: 17/11/2023 00:35:24 ******/
CREATE DATABASE [ProyectoFinal]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ProyectoFinal', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\ProyectoFinal.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ProyectoFinal_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\ProyectoFinal_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [ProyectoFinal] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ProyectoFinal].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ProyectoFinal] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ProyectoFinal] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ProyectoFinal] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ProyectoFinal] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ProyectoFinal] SET ARITHABORT OFF 
GO
ALTER DATABASE [ProyectoFinal] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ProyectoFinal] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ProyectoFinal] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ProyectoFinal] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ProyectoFinal] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ProyectoFinal] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ProyectoFinal] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ProyectoFinal] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ProyectoFinal] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ProyectoFinal] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ProyectoFinal] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ProyectoFinal] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ProyectoFinal] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ProyectoFinal] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ProyectoFinal] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ProyectoFinal] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ProyectoFinal] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ProyectoFinal] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ProyectoFinal] SET  MULTI_USER 
GO
ALTER DATABASE [ProyectoFinal] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ProyectoFinal] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ProyectoFinal] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ProyectoFinal] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ProyectoFinal] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ProyectoFinal] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'ProyectoFinal', N'ON'
GO
ALTER DATABASE [ProyectoFinal] SET QUERY_STORE = OFF
GO
USE [ProyectoFinal]
GO
/****** Object:  User [alumno]    Script Date: 17/11/2023 00:35:24 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [alumno]
GO
/****** Object:  Table [dbo].[Categorias]    Script Date: 17/11/2023 00:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categorias](
	[idCategoria] [int] IDENTITY(1,1) NOT NULL,
	[categoria] [varchar](50) NOT NULL,
	[puntos] [int] NOT NULL,
	[fkTipoPublicacion] [int] NOT NULL,
	[imagen] [varchar](500) NULL,
 CONSTRAINT [PK_Categorias] PRIMARY KEY CLUSTERED 
(
	[idCategoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contrataciones]    Script Date: 17/11/2023 00:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contrataciones](
	[idContratacion] [int] IDENTITY(1,1) NOT NULL,
	[fechaInicio] [date] NOT NULL,
	[fechaFin] [date] NULL,
	[fkUsuario1] [int] NOT NULL,
	[fkPublicacion] [int] NOT NULL,
	[estado] [varchar](500) NOT NULL,
 CONSTRAINT [PK_Contrataciones] PRIMARY KEY CLUSTERED 
(
	[idContratacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Favoritos]    Script Date: 17/11/2023 00:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Favoritos](
	[idFavoritos] [int] IDENTITY(1,1) NOT NULL,
	[fkpublicacion] [int] NOT NULL,
	[fkUsuario] [int] NOT NULL,
 CONSTRAINT [PK_Favoritos] PRIMARY KEY CLUSTERED 
(
	[idFavoritos] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Imagenes]    Script Date: 17/11/2023 00:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Imagenes](
	[idImagenes] [int] IDENTITY(1,1) NOT NULL,
	[imagen] [varchar](6000) NOT NULL,
	[fkPublicacion] [int] NOT NULL,
 CONSTRAINT [PK_Imagenes] PRIMARY KEY CLUSTERED 
(
	[idImagenes] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Opiniones]    Script Date: 17/11/2023 00:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Opiniones](
	[IdOpiniones] [int] IDENTITY(1,1) NOT NULL,
	[puntos] [int] NOT NULL,
	[fkUsuario] [int] NOT NULL,
	[fkPublicacion] [int] NOT NULL,
 CONSTRAINT [PK_Opiniones] PRIMARY KEY CLUSTERED 
(
	[IdOpiniones] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Preguntas]    Script Date: 17/11/2023 00:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Preguntas](
	[idPreguntas] [int] IDENTITY(1,1) NOT NULL,
	[pregunta] [varchar](50) NOT NULL,
	[respuesta] [varchar](50) NULL,
	[fkPublicacion] [int] NOT NULL,
	[fkUsuario] [int] NOT NULL,
 CONSTRAINT [PK_Preguntas] PRIMARY KEY CLUSTERED 
(
	[idPreguntas] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Publicaciones]    Script Date: 17/11/2023 00:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Publicaciones](
	[idPublicacion] [int] IDENTITY(1,1) NOT NULL,
	[titulo] [varchar](500) NOT NULL,
	[cantCredito] [int] NULL,
	[descripcion] [varchar](500) NOT NULL,
	[ubicacion] [varchar](500) NULL,
	[fkUsuario] [int] NOT NULL,
	[fkCategoria] [int] NOT NULL,
 CONSTRAINT [PK_Publicaciones] PRIMARY KEY CLUSTERED 
(
	[idPublicacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoPublicacion]    Script Date: 17/11/2023 00:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoPublicacion](
	[idTipoPublicacion] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nchar](100) NOT NULL,
 CONSTRAINT [PK_TipoPublicacion] PRIMARY KEY CLUSTERED 
(
	[idTipoPublicacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 17/11/2023 00:35:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[idUsuario] [int] IDENTITY(1,1) NOT NULL,
	[img] [varchar](5000) NULL,
	[email] [varchar](50) NOT NULL,
	[nombreUsuario] [varchar](50) NOT NULL,
	[contraseña] [varchar](50) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[apellido] [varchar](50) NOT NULL,
	[fechaNacimiento] [date] NOT NULL,
	[direccion] [varchar](50) NULL,
	[creditos] [int] NOT NULL,
	[descripcion] [varchar](50) NULL,
	[puntuacion] [int] NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Categorias] ON 

INSERT [dbo].[Categorias] ([idCategoria], [categoria], [puntos], [fkTipoPublicacion], [imagen]) VALUES (1, N'mueble', 30, 1, N'https://fabricasunidas.com.ar/wp-content/uploads/2020/04/34708039_003_03-scaled.jpg')
INSERT [dbo].[Categorias] ([idCategoria], [categoria], [puntos], [fkTipoPublicacion], [imagen]) VALUES (3, N'electrodomestico', 50, 1, N'https://www.verte.tv/image/50931/electrodomesticos.jpg')
INSERT [dbo].[Categorias] ([idCategoria], [categoria], [puntos], [fkTipoPublicacion], [imagen]) VALUES (4, N'mantenimiento', 100, 2, N'https://static.wixstatic.com/media/5668dd_78f4741c2ba9481bb42699a6aa31e20e~mv2.jpg/v1/fill/w_640,h_478,al_c,lg_1,q_80,enc_auto/5668dd_78f4741c2ba9481bb42699a6aa31e20e~mv2.jpg')
INSERT [dbo].[Categorias] ([idCategoria], [categoria], [puntos], [fkTipoPublicacion], [imagen]) VALUES (5, N'clases', 80, 2, N'https://www.sancristobalsl.com/archivos/noticias/3218/20201003172024.img_8845-1370.jpg')
INSERT [dbo].[Categorias] ([idCategoria], [categoria], [puntos], [fkTipoPublicacion], [imagen]) VALUES (6, N'ceramica', 23, 1, N'https://humanidades.com/wp-content/uploads/2016/09/ceramica-e1560623835418.jpg')
INSERT [dbo].[Categorias] ([idCategoria], [categoria], [puntos], [fkTipoPublicacion], [imagen]) VALUES (7, N'plomeria', 68, 2, N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIN_rXJ_gIACrD7P_m3niofVlypSlbCL8lWA&usqp=CAU')
SET IDENTITY_INSERT [dbo].[Categorias] OFF
GO
SET IDENTITY_INSERT [dbo].[Contrataciones] ON 

INSERT [dbo].[Contrataciones] ([idContratacion], [fechaInicio], [fechaFin], [fkUsuario1], [fkPublicacion], [estado]) VALUES (7, CAST(N'2023-11-15' AS Date), CAST(N'2023-11-16' AS Date), 1, 2, N'finalizado')
INSERT [dbo].[Contrataciones] ([idContratacion], [fechaInicio], [fechaFin], [fkUsuario1], [fkPublicacion], [estado]) VALUES (9, CAST(N'2023-11-16' AS Date), NULL, 1, 3, N'pendiente')
INSERT [dbo].[Contrataciones] ([idContratacion], [fechaInicio], [fechaFin], [fkUsuario1], [fkPublicacion], [estado]) VALUES (10, CAST(N'2023-11-16' AS Date), NULL, 1, 4, N'pendiente')
SET IDENTITY_INSERT [dbo].[Contrataciones] OFF
GO
SET IDENTITY_INSERT [dbo].[Imagenes] ON 

INSERT [dbo].[Imagenes] ([idImagenes], [imagen], [fkPublicacion]) VALUES (1, N'https://cdn.euroinnova.edu.es/img/subidasEditor/fotolia_61427847_subscription_monthly_m-1576654671.webp', 2)
INSERT [dbo].[Imagenes] ([idImagenes], [imagen], [fkPublicacion]) VALUES (2, N'https://eldiariodelaeducacion.com/wp-content/uploads/sites/17/2021/05/iStock-1178699298.jpg', 3)
INSERT [dbo].[Imagenes] ([idImagenes], [imagen], [fkPublicacion]) VALUES (3, N'https://www.mndelgolfo.com/blog/wp-content/uploads/2017/09/herramientas-para-electricista.jpg', 4)
INSERT [dbo].[Imagenes] ([idImagenes], [imagen], [fkPublicacion]) VALUES (4, N'https://cdn.euroinnova.edu.es/img/subidasEditor/fotolia_61427847_subscription_monthly_m-1576654671.webp', 7)
INSERT [dbo].[Imagenes] ([idImagenes], [imagen], [fkPublicacion]) VALUES (5, N'https://cdn.euroinnova.edu.es/img/subidasEditor/fotolia_61427847_subscription_monthly_m-1576654671.webp', 8)
INSERT [dbo].[Imagenes] ([idImagenes], [imagen], [fkPublicacion]) VALUES (6, N'https://cdn.euroinnova.edu.es/img/subidasEditor/fotolia_61427847_subscription_monthly_m-1576654671.webp', 9)
SET IDENTITY_INSERT [dbo].[Imagenes] OFF
GO
SET IDENTITY_INSERT [dbo].[Publicaciones] ON 

INSERT [dbo].[Publicaciones] ([idPublicacion], [titulo], [cantCredito], [descripcion], [ubicacion], [fkUsuario], [fkCategoria]) VALUES (2, N'Peluqueria', 30, N'lol', N'Caballito', 2, 5)
INSERT [dbo].[Publicaciones] ([idPublicacion], [titulo], [cantCredito], [descripcion], [ubicacion], [fkUsuario], [fkCategoria]) VALUES (3, N'Clases', 30, N'lol', N'Palermo', 2, 4)
INSERT [dbo].[Publicaciones] ([idPublicacion], [titulo], [cantCredito], [descripcion], [ubicacion], [fkUsuario], [fkCategoria]) VALUES (4, N'Electricista', 30, N'sadasd', N'peru', 2, 7)
INSERT [dbo].[Publicaciones] ([idPublicacion], [titulo], [cantCredito], [descripcion], [ubicacion], [fkUsuario], [fkCategoria]) VALUES (7, N'mesa', 30, N'sadsad', N'peru', 2, 1)
INSERT [dbo].[Publicaciones] ([idPublicacion], [titulo], [cantCredito], [descripcion], [ubicacion], [fkUsuario], [fkCategoria]) VALUES (8, N'heladera', 30, N'sadasdsa', N'peru', 2, 3)
INSERT [dbo].[Publicaciones] ([idPublicacion], [titulo], [cantCredito], [descripcion], [ubicacion], [fkUsuario], [fkCategoria]) VALUES (9, N'maceta', 20, N'asdasda', N'peru', 2, 6)
INSERT [dbo].[Publicaciones] ([idPublicacion], [titulo], [cantCredito], [descripcion], [ubicacion], [fkUsuario], [fkCategoria]) VALUES (10, N'lolsda', 23, N'sadas|', N'fead||', 2, 1)
INSERT [dbo].[Publicaciones] ([idPublicacion], [titulo], [cantCredito], [descripcion], [ubicacion], [fkUsuario], [fkCategoria]) VALUES (11, N'asd', 4, N'asda', N'', 1, 4)
SET IDENTITY_INSERT [dbo].[Publicaciones] OFF
GO
SET IDENTITY_INSERT [dbo].[TipoPublicacion] ON 

INSERT [dbo].[TipoPublicacion] ([idTipoPublicacion], [nombre]) VALUES (1, N'Producto                                                                                            ')
INSERT [dbo].[TipoPublicacion] ([idTipoPublicacion], [nombre]) VALUES (2, N'Servicio                                                                                            ')
SET IDENTITY_INSERT [dbo].[TipoPublicacion] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([idUsuario], [img], [email], [nombreUsuario], [contraseña], [nombre], [apellido], [fechaNacimiento], [direccion], [creditos], [descripcion], [puntuacion]) VALUES (1, N'https://sportcases.com.ar/wp-content/uploads/2017/08/Juan-Ignacio-Pepe-Sanchez.jpg', N'juanpepe@gmail.com', N'juanpepegod35', N'tilin', N'juan', N'pepe', CAST(N'2011-11-11' AS Date), N'yatay', 450, N'hola soy juan pepe sunglasses', 4)
INSERT [dbo].[Usuario] ([idUsuario], [img], [email], [nombreUsuario], [contraseña], [nombre], [apellido], [fechaNacimiento], [direccion], [creditos], [descripcion], [puntuacion]) VALUES (2, N'https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg', N'jorge', N'jorgegod', N'1234', N'jorge', N'god', CAST(N'2023-11-16' AS Date), N'peru', 232, N'hola soy jorge y soy god', 5)
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
ALTER TABLE [dbo].[Categorias]  WITH CHECK ADD  CONSTRAINT [FK_Categorias_TipoPublicacion] FOREIGN KEY([fkTipoPublicacion])
REFERENCES [dbo].[TipoPublicacion] ([idTipoPublicacion])
GO
ALTER TABLE [dbo].[Categorias] CHECK CONSTRAINT [FK_Categorias_TipoPublicacion]
GO
ALTER TABLE [dbo].[Contrataciones]  WITH CHECK ADD  CONSTRAINT [FK_Contrataciones_Publicaciones] FOREIGN KEY([fkPublicacion])
REFERENCES [dbo].[Publicaciones] ([idPublicacion])
GO
ALTER TABLE [dbo].[Contrataciones] CHECK CONSTRAINT [FK_Contrataciones_Publicaciones]
GO
ALTER TABLE [dbo].[Contrataciones]  WITH CHECK ADD  CONSTRAINT [FK_Contrataciones_Usuario1] FOREIGN KEY([fkUsuario1])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[Contrataciones] CHECK CONSTRAINT [FK_Contrataciones_Usuario1]
GO
ALTER TABLE [dbo].[Favoritos]  WITH CHECK ADD  CONSTRAINT [FK_Favoritos_Publicaciones] FOREIGN KEY([fkpublicacion])
REFERENCES [dbo].[Publicaciones] ([idPublicacion])
GO
ALTER TABLE [dbo].[Favoritos] CHECK CONSTRAINT [FK_Favoritos_Publicaciones]
GO
ALTER TABLE [dbo].[Favoritos]  WITH CHECK ADD  CONSTRAINT [FK_Favoritos_Usuario] FOREIGN KEY([fkUsuario])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[Favoritos] CHECK CONSTRAINT [FK_Favoritos_Usuario]
GO
ALTER TABLE [dbo].[Imagenes]  WITH CHECK ADD  CONSTRAINT [FK_Imagenes_Publicaciones] FOREIGN KEY([fkPublicacion])
REFERENCES [dbo].[Publicaciones] ([idPublicacion])
GO
ALTER TABLE [dbo].[Imagenes] CHECK CONSTRAINT [FK_Imagenes_Publicaciones]
GO
ALTER TABLE [dbo].[Opiniones]  WITH CHECK ADD  CONSTRAINT [FK_Opiniones_Publicaciones] FOREIGN KEY([fkPublicacion])
REFERENCES [dbo].[Publicaciones] ([idPublicacion])
GO
ALTER TABLE [dbo].[Opiniones] CHECK CONSTRAINT [FK_Opiniones_Publicaciones]
GO
ALTER TABLE [dbo].[Opiniones]  WITH CHECK ADD  CONSTRAINT [FK_Opiniones_Usuario] FOREIGN KEY([fkUsuario])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[Opiniones] CHECK CONSTRAINT [FK_Opiniones_Usuario]
GO
ALTER TABLE [dbo].[Preguntas]  WITH CHECK ADD  CONSTRAINT [FK_Preguntas_Publicaciones] FOREIGN KEY([fkPublicacion])
REFERENCES [dbo].[Publicaciones] ([idPublicacion])
GO
ALTER TABLE [dbo].[Preguntas] CHECK CONSTRAINT [FK_Preguntas_Publicaciones]
GO
ALTER TABLE [dbo].[Preguntas]  WITH CHECK ADD  CONSTRAINT [FK_Preguntas_Usuario] FOREIGN KEY([fkUsuario])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[Preguntas] CHECK CONSTRAINT [FK_Preguntas_Usuario]
GO
ALTER TABLE [dbo].[Publicaciones]  WITH CHECK ADD  CONSTRAINT [FK_Publicaciones_Categorias] FOREIGN KEY([fkCategoria])
REFERENCES [dbo].[Categorias] ([idCategoria])
GO
ALTER TABLE [dbo].[Publicaciones] CHECK CONSTRAINT [FK_Publicaciones_Categorias]
GO
ALTER TABLE [dbo].[Publicaciones]  WITH CHECK ADD  CONSTRAINT [FK_Publicaciones_Usuario] FOREIGN KEY([fkUsuario])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[Publicaciones] CHECK CONSTRAINT [FK_Publicaciones_Usuario]
GO
USE [master]
GO
ALTER DATABASE [ProyectoFinal] SET  READ_WRITE 
GO
