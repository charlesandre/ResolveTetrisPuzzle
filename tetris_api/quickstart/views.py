# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from django.shortcuts import render

# Create your views here.
@api_view(['GET'])
def api_root(request, format=None):

    return Response({
        'success':True,
        'message':"Hello world"
 })
