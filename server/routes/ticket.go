package routes

import (
	"landtick/handlers"
	"landtick/pkg/middleware"
	"landtick/pkg/mysql"
	"landtick/repositories"

	"github.com/labstack/echo/v4"
)

func TicketRoutes(e *echo.Group) {
	TicketRepository := repositories.RepositoryTicket(mysql.DB)
	StationRepository := repositories.RepositoryStation(mysql.DB)
	h := handlers.HandlerTicket(TicketRepository, StationRepository)

	e.GET("/tickets", h.FindAllTickets)
	e.POST("/ticket", middleware.Auth(h.CreateTicket))
	e.GET("/ticket/:id", h.GetTicket)
	e.POST("/ticket-transaction/:id", middleware.Auth(h.CreateTransactionQty))
	e.DELETE("/ticket/:id", h.DeleteTicket)
}
