# MJPEG Streaming AP.
# URL：http://192.168.1.1:8080

import sensor, image, time, network, usocket, sys, pyb, os, tf
from mqtt import MQTTClient
HOST = ''           # Use first avaiable interface
PORT = 8080         # Arbitrary non-privileged port
HOSTT = 'http://localhost:4000'

# Connect Example
#
# This example shows how to connect your OpenMV Cam with a WiFi shield to the net.

import network

SSID='private' # Network SSID
KEY='private'  # Network key

# Init wlan module and connect to network
print("Trying to connect... (may take a while)...")

wlan = network.WINC()
wlan.connect(SSID, key=KEY, security=wlan.WPA_PSK)

# We should have a valid IP now via DHCP
print(wlan.ifconfig())



# Settings
person_threshold = 0.7

led = pyb.LED(1)
led.off()

# Reset sensor
sensor.reset()
# Set sensor settings
sensor.set_pixformat(sensor.GRAYSCALE) # Set pixel format to RGB565 (or GRAYSCALE)
sensor.set_framesize(sensor.QVGA)   # Set frame size to QVGA (320x240)


# Load the built-in person detection network (the network is in your OpenMV Cam's firmware).
net = tf.load('person_detection')
labels = ['unsure', 'person', 'no_person']

# You can block waiting for client to connect
#print(wlan.wait_for_sta(10000))
def sub_cb(topic, msg):
   cp = MQTTClient("openmv", "iot-edu-lab.lnu.se", port=1883)

   cp.set_callback(sub_cb)
   cp.connect()
   cp.subscribe(topic)

   print("Sending ON")
   cp.publish(topic="oncamera/feeds/lights", msg="ON")
   return

def start_streaming(s):
    print ('Waiting for connections..')
    client, addr = s.accept()
    # set client socket timeout to 2s
    client.settimeout(2.0)
    print ('Connected to ' + addr[0] + ':' + str(addr[1]))

    # Read request from client
    data = client.recv(1024)
    # should parse client request here

    # Send multipart header
    client.send("HTTP/1.1 200 OK\r\n" \
                "Server: OpenMV\r\n" \
                "Content-Type: multipart/x-mixed-replace;boundary=openmv\r\n" \
                "Cache-Control: no-cache\r\n" \
                "Pragma: no-cache\r\n\r\n")
    # FPS clock
    clock = time.clock()
    # Start streaming images
    # NOTE: Disable IDE preview to increase streaming FPS

    count = 0
    while (True):
        clock.tick()

        frame = sensor.snapshot()
        #cframe = frame.compressed(quality=35)
        for obj in net.classify(frame, min_scale=1.0, scale_mul=0.5, x_overlap=0.0, y_overlap=0.0):
            print("**********\nDetections at [x=%d,y=%d,w=%d,h=%d]" % obj.rect())
            for i in range(len(obj.output())):
                print("%s = %f" % (labels[i], obj.output()[i]))

            # Highlight identified object
            frame.draw_rectangle(obj.rect())
            frame.draw_string(obj.x()+3, obj.y()-1, labels[obj.output().index(max(obj.output()))], mono_space = False)
            idx = labels.index('person')
            if obj.output()[idx] > person_threshold:
                led.on()
                frame.save("snapshot1.bmp")
                if count < 2:
                    sub_cb("youraccount/feeds/lights","true")
                    count = count + 1
                    print(count)
                print("akbar")
            else:
                led.off()
            cframe = frame.compressed(quality=55)
            header = "\r\n--openmv\r\n" \
                 "Content-Type: image/jpeg\r\n"\
                 "Content-Length:"+str(cframe.size())+"\r\n\r\n"
            client.send(header)
            client.send(cframe)
            print(clock.fps())

while (True):
    # Create server socket
    s = usocket.socket(usocket.AF_INET, usocket.SOCK_STREAM)
    try:
        # Bind and listen
        s.bind([HOST, PORT])
        s.listen(5)
        # Set server socket timeout
        s.settimeout(3)
        start_streaming(s)
    except OSError as e:
        s.close()
        #print("socket error: ", e)
        #sys.print_exception(e)
