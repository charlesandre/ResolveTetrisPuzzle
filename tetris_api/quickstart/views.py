# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from django.shortcuts import render
import numpy as np
import itertools


def drawOnBoard(board, element, x, y):
    for i in range(element.shape[0]):
        for j in range(element.shape[1]):
            if (board[i+x][j+y] == 0 and element[i][j] != 0):
                board[i+x][j+y] = element[i][j]
    return board

def hasWin(board):
    for i in range(board.shape[1]):
        for j in range(board.shape[0]):
            if(board[i][j] == 0):
                return False
    return True



def fitElement(board, element):
    elementHasFitted = False
    if (elementHasFitted == False):
        for x in range(board.shape[0] - element.shape[0] +1):
            for y in range(board.shape[1] - element.shape[1] +1):
                elementCurrentlyFitting = 0
                for i in range(element.shape[0]):
                    for j in range(element.shape[1]):
                        if(board[x+i][j+y] == 0 or element[i][j] == 0):
                            elementCurrentlyFitting = elementCurrentlyFitting+1
                if(elementCurrentlyFitting == element.shape[1]*element.shape[0]):
                    return x,y
        return False


def fitBoard(board, elements, size):
    board = np.zeros([size, size])
    for element in elements:
        coordonates = fitElement(board, element)
        if coordonates != False:
            board = drawOnBoard(board, element, coordonates[0], coordonates[1])
            elementFitted = True
        if hasWin(board):
            return True, board
    return False, board


def orderElements(board, elements, size):
    for elements in list(itertools.permutations(elements)):
        solution = fitBoard(board,elements, size)
        if solution[0] == True:
            return True, solution, len(list(itertools.permutations(elements)))
    return False, board

def findEveryOrders(elements):
    array = []
    newElements = []
    for element in elements:
        array.append(element)
        array.append(np.rot90(element))
        array.append(np.rot90(np.rot90(element)))
        array.append(np.rot90(np.rot90(np.rot90(element))))
        newElements.append(array)
        array = []
    return list(itertools.product(*newElements))

def findSolutionWithRotation(board, elements, size):
    ElementsOrderedWithRotation = findEveryOrders(elements)
    for elements in ElementsOrderedWithRotation:
        solution = orderElements(board, elements, size)
        if solution[0] == True:
            return solution[1]


# Create your views here.
@api_view(['POST'])
def api_root(request, format=None):

    elements = request.data['elements']
    newElements = []
    for element in elements:
        newElements.append(np.array(element))

    print newElements

    size = int(request.data['size'])
    board = np.zeros([size, size])

    print "C PARTI"
    result = findSolutionWithRotation(board, newElements, size)

    if result == None:
        success = False
        message = "Puzzle is not possible"

    else:
        success = True
        message = result[1]

    print "FINI"

    return Response({
        'success':success,
        'message': message
 })
