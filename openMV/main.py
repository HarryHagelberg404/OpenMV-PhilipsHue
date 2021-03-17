from phue import Bridge

b = Bridge("192.168.1.187", "Ji5zEueIFeM1rUXDGdc8sSsYBrdGRKNpbOkTqouE")

b.connect()

b.set_light([1, 2], "on", True)
