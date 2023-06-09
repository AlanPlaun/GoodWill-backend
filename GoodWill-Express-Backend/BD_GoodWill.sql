USE [master]
GO
/****** Object:  Database [ProyectoFinal]    Script Date: 7/7/2023 12:02:59 ******/
CREATE DATABASE [ProyectoFinal]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ProyectoFinal', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\ProyectoFinal.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ProyectoFinal_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\ProyectoFinal_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
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
EXEC sys.sp_db_vardecimal_storage_format N'ProyectoFinal', N'ON'
GO
ALTER DATABASE [ProyectoFinal] SET QUERY_STORE = OFF
GO
USE [ProyectoFinal]
GO
/****** Object:  User [alumno]    Script Date: 7/7/2023 12:02:59 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Categorias]    Script Date: 7/7/2023 12:02:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categorias](
	[idCategoria] [int] IDENTITY(1,1) NOT NULL,
	[categoria] [varchar](50) NOT NULL,
	[puntos] [int] NOT NULL,
	[fkTipoPublicacion] [int] NOT NULL,
 CONSTRAINT [PK_Categorias] PRIMARY KEY CLUSTERED 
(
	[idCategoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contrataciones]    Script Date: 7/7/2023 12:02:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contrataciones](
	[idContratacion] [int] NOT NULL,
	[fechaInicio] [date] NOT NULL,
	[fechaFin] [date] NOT NULL,
	[fkUsuario1] [int] NOT NULL,
	[fkUsuario2] [int] NOT NULL,
	[fkPublicacion] [int] NOT NULL,
 CONSTRAINT [PK_Contrataciones] PRIMARY KEY CLUSTERED 
(
	[idContratacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Favoritos]    Script Date: 7/7/2023 12:02:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Favoritos](
	[idFavoritos] [int] NOT NULL,
	[fkpublicacion] [int] NOT NULL,
	[fkUsuario] [int] NOT NULL,
 CONSTRAINT [PK_Favoritos] PRIMARY KEY CLUSTERED 
(
	[idFavoritos] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Imagenes]    Script Date: 7/7/2023 12:02:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Imagenes](
	[idImagenes] [int] NOT NULL,
	[imagen] [varchar](50) NOT NULL,
	[fkPublicacion] [int] NOT NULL,
 CONSTRAINT [PK_Imagenes] PRIMARY KEY CLUSTERED 
(
	[idImagenes] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Opiniones]    Script Date: 7/7/2023 12:02:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Opiniones](
	[IdOpiniones] [int] NOT NULL,
	[puntos] [int] NOT NULL,
	[fkUsuario] [int] NOT NULL,
	[fkPublicacion] [int] NOT NULL,
 CONSTRAINT [PK_Opiniones] PRIMARY KEY CLUSTERED 
(
	[IdOpiniones] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Preguntas]    Script Date: 7/7/2023 12:02:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Preguntas](
	[idPreguntas] [int] NOT NULL,
	[pregunta] [varchar](50) NOT NULL,
	[respuesta] [varchar](50) NULL,
	[fkPublicacion] [int] NOT NULL,
	[fkUsuario] [int] NOT NULL,
 CONSTRAINT [PK_Preguntas] PRIMARY KEY CLUSTERED 
(
	[idPreguntas] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Productos]    Script Date: 7/7/2023 12:02:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Productos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NULL,
	[Descripcion] [varchar](50) NULL,
	[FechaVencimiento] [datetime] NULL,
	[Precio] [float] NULL,
 CONSTRAINT [PK_Productos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Publicaciones]    Script Date: 7/7/2023 12:02:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Publicaciones](
	[idPublicacion] [int] NOT NULL,
	[titulo] [varchar](50) NOT NULL,
	[cantCredito] [int] NOT NULL,
	[descripcion] [varchar](50) NOT NULL,
	[ubicacion] [varchar](50) NULL,
	[fkUsuario] [int] NOT NULL,
	[fkCategoria] [int] NOT NULL,
 CONSTRAINT [PK_Publicaciones] PRIMARY KEY CLUSTERED 
(
	[idPublicacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoPublicacion]    Script Date: 7/7/2023 12:02:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoPublicacion](
	[idTipoPublicacion] [int] NOT NULL,
	[nombre] [nchar](10) NOT NULL,
 CONSTRAINT [PK_TipoPublicacion] PRIMARY KEY CLUSTERED 
(
	[idTipoPublicacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 7/7/2023 12:02:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[idUsuario] [int] IDENTITY(1,1) NOT NULL,
	[img] [varchar](50) NULL,
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Categorias] ON 

INSERT [dbo].[Categorias] ([idCategoria], [categoria], [puntos], [fkTipoPublicacion]) VALUES (1, N'mueble', 30, 1)
INSERT [dbo].[Categorias] ([idCategoria], [categoria], [puntos], [fkTipoPublicacion]) VALUES (3, N'electrodomestico', 50, 1)
SET IDENTITY_INSERT [dbo].[Categorias] OFF
GO
INSERT [dbo].[TipoPublicacion] ([idTipoPublicacion], [nombre]) VALUES (1, N'Producto  ')
INSERT [dbo].[TipoPublicacion] ([idTipoPublicacion], [nombre]) VALUES (2, N'Servicio  ')
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([idUsuario], [img], [email], [nombreUsuario], [contraseña], [nombre], [apellido], [fechaNacimiento], [direccion], [creditos], [descripcion], [puntuacion]) VALUES (1, N'juanpepe.jpg', N'juanpepe@gmail.com', N'juanpepegod35', N'tilin', N'juan', N'pepe', CAST(N'2011-11-11' AS Date), N'yatay', 450, N'hola soy juan pepe sunglasses', 4)
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
ALTER TABLE [dbo].[Contrataciones]  WITH CHECK ADD  CONSTRAINT [FK_Contrataciones_Usuario] FOREIGN KEY([fkUsuario2])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[Contrataciones] CHECK CONSTRAINT [FK_Contrataciones_Usuario]
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
