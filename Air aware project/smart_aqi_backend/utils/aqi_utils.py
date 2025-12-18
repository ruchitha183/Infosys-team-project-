# def calculate_aqi_from_pm25(pm25):
#     """
#     US EPA PM2.5 AQI calculation (simplified)
#     """
#     if pm25 <= 12:
#         return 50
#     elif pm25 <= 35.4:
#         return 100
#     elif pm25 <= 55.4:
#         return 150
#     elif pm25 <= 150.4:
#         return 200
#     elif pm25 <= 250.4:
#         return 300
#     else:
#         return 400

def calculate_aqi_from_pm25(pm25):
    """
    Continuous AQI calculation using US EPA breakpoints
    """
    breakpoints = [
        (0.0, 12.0, 0, 50),
        (12.1, 35.4, 51, 100),
        (35.5, 55.4, 101, 150),
        (55.5, 150.4, 151, 200),
        (150.5, 250.4, 201, 300),
        (250.5, 500.4, 301, 500),
    ]

    for bp_lo, bp_hi, i_lo, i_hi in breakpoints:
        if bp_lo <= pm25 <= bp_hi:
            return ((i_hi - i_lo) / (bp_hi - bp_lo)) * (pm25 - bp_lo) + i_lo

    return 500
