package routes

import (
	"landtick/handlers"
	"landtick/pkg/middleware"
	"landtick/pkg/mysql"
	"landtick/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	e.GET("/users", h.FindAllUser)
	e.GET("/user/:id", h.GetUser)
	e.POST("/user", middleware.UploadFile(h.Register))
	e.POST("/login", h.Login)
	// e.PATCH("/user/:id", h.UpdateUser)
	// e.DELETE("/user/:id", h.DeleteUser)
}
