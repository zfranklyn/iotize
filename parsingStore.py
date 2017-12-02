
# scrapy
import sys
from tkinter import *
from bs4 import BeautifulSoup
import urllib.request as ur
import re
import random
import mechanicalsoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class Error(Exception):
    '''Base class for exceptions in this module.'''
    pass

#raised for different exeptions
class TimeoutException(Error):
    '''Exception raised for errors in the input.'''
    pass  

def my_element(delay, by, element):
	global driver
	try:
		myElem = WebDriverWait(driver, delay).until(EC.presence_of_element_located((by, element)))
		print("Page is ready!")
		return myElem
	except TimeoutException:
		print("Loading took too much time!")

def fill_item(url, searchterm):
	global driver
	driver = webdriver.Firefox()
	driver.get(url)
	delay = 20 # seconds
	myElem = my_element(delay,By.ID, 'header-search-field')

	elem = driver.find_element_by_id('header-search-field')

	elem.clear()
	elem.send_keys(searchterm)
	elem.send_keys(Keys.RETURN)

	time.sleep(10)
	myElem = my_element(delay+10, By.CLASS_NAME, 'image-container')

	test = driver.page_source
	# print(test)
	soup = get_page_elemts_from_source(test)
	items =  soup.find_all('a', href=True)

	tried ={}
	data = {}
	i = 0
	for a in items:
		print("Test: ",a.get('href'),)
		if re.match(r'\/clothing\/(men|women)', a.get('href')) and a.get('href') not in tried:
			tried[a.get('href')] = "SEEN"
			# print("Test: ",a.get('href'),)
			driver.get(url+a.get('href'))

			# currentPage = driver.page_source
			# soup = get_page_elemts_from_source(currentPage)
			# get_image_url(soup)
			break
		if i == 5:
			break


def get_image_url(soup):
	print("in here")



def get_page_elements(url):
	page = ur.urlopen(url).read()
	soup = BeautifulSoup(page, 'html.parser')
	return soup

def get_page_elemts_from_source(source):
	soup = BeautifulSoup(source, 'html.parser')
	return soup

# #GUI
def scrap_data(url, searchterm):
	fill_item(url, searchterm)

def main():
	global e
	#GUI
	root = Tk()
	root.title('Name')
	e = Entry(root)
	e.delete(0, END)
	e.insert(0, "https://www.express.com/")
	e.pack()
	s = Entry(root)
	s.delete(0, END)
	s.insert(0, "search value")
	s.pack()
	b = Button(root,text='Scrap data',command=lambda: scrap_data(e.get(), s.get()))
	b.pack(side='bottom')
	root.mainloop()

main()
